const express = require("express");
const { MongoClient } = require("mongodb");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const mongoURI = "enter mongoDB uri here";
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const SECRET_KEY = "somethingsomethig";



app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // 1-hour session
    })
);



app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));



client.connect().then(() => {
  console.log("MongoDB successfully connected...");
  const db = client.db("chatDB");
  const users = db.collection("users");
  const chat = db.collection("chats");

  app.get('/', (req, res) => {
    if (req.session && req.session.token) {
        res.redirect('/chat');
    } else {
        res.redirect('/login');
    }
});
  // Serve chat.html
  app.get("/chat", (req, res) => {
    if (!req.session.token) {
      return res.status(403).json({ message: "Access denied. Please log in." });
  }
    res.sendFile(path.join(__dirname, "public", "chat.html"));
  });

  app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "auth/login.html"))
  })

  app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "auth/register.html"))
  })

  // Register endpoint
  app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "All fields are required" });

    const userExists = await users.findOne({ username });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    const emailExists = await users.findOne({ email });
    if (emailExists) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ username: username,email: email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });
    
  });

  // Login endpoint
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "All fields are required" });

    const user = await users.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    req.session.token = token;
    req.session.username = username
    res.json({ message: "Login successful", username });
  });

  io.on("connection", socket => {
    console.log("New client connected");

    chat.find().limit(100).sort({ _id: 1 }).toArray()
      .then(messages => {
        socket.emit("output", messages);
      })
      .catch(err => console.error("Error fetching messages:", err));

    socket.on("input", async data => {
      const { name, message } = data;
      if (!name || !message) {
        socket.emit("status", "Please enter a name and message");
      } else {
        try {
          await chat.insertOne({ name, message });
          io.emit("output", [data]);
          socket.emit("status", { message: "Message sent", clear: true });
        } catch (err) {
          console.error("Error inserting message:", err);
        }
      }
    });

    socket.on("clear", async () => {
      try {
        await chat.deleteMany({});
        io.emit("cleared");
      } catch (err) {
        console.error("Error clearing chat:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  server.listen(4000, () => {
    console.log("Server running on port 4000...");
  });
}).catch(err => console.error("MongoDB connection error:", err));
