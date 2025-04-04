﻿# 🚀 Simple Socket.IO Chat App

Hey there! 👋 Welcome to my simple real-time chat app built with **Socket.IO, Express.js, and MongoDB**. This was a fun college project to dive into WebSockets and real-time communication. 

## ✨ Features
- 🔑 User authentication (Login & Register)
- 💬 Real-time chat (Broadcast messages to all users)
- 🗄️ MongoDB for user data storage
- ⚡ Express.js for handling server logic
- 📡 Socket.IO for real-time communication
- 💻 Chat history is saved and displayed

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSockets:** Socket.IO

## 🚀 Getting Started
### Prerequisites
Make sure you have these installed before starting:
- **Node.js** (v14 or later recommended)
- **MongoDB** (Local or Cloud-based, e.g., MongoDB Atlas)

### 🔧 Setup & Installation
1️⃣ **Clone the repository:**
   ```sh
   git clone https://github.com/siddiqui-ayan/simple-socketio-chat-app.git
   cd simple-socketio-chat-app
   ```

2️⃣ **Install dependencies:**
   ```sh
   npm install
   ```

3️⃣ **Set up MongoDB connection:**
   Open `./server.js and replace `'enter mongoDB uri her'` with your actual MongoDB URI:
   ```node
   const mongoURI = "enter mongoDB uri here";
   ```

4️⃣ **Start the MongoDB server:** *(Skip this step if using MongoDB Atlas)*
   ```sh
   mongod
   ```

5️⃣ **Run the server:**
   ```sh
   npm start
   ```
   Your server will be live at: `http://localhost:4000`

6️⃣ **Open the app in your browser:**
   ```sh
   http://localhost:4000
   ```

## 📸 Screenshots

Login Page:

![Login Screen](screenshots/login.png)

Register Page:

![Register Screen](screenshots/register.png)

Chat Interface: 

![Chat Interface](screenshots/chat.png)


## 💡 How It Works
- Register or log in with your credentials.
- Start sending messages to all connected users in real time.
- That’s it! Chat away! 😃

## 🚀 Future Enhancements
- 🗨️ Private messaging
- 🟢 User online/offline status
- 🎨 Better UI/UX improvements
- ☁️ Deployment to a cloud service
- 🏢 Room-based chat system

## 🤝 Contributing
Feel free to **fork** this repository and submit a **pull request**. Any improvements and suggestions are always welcome! 

## 📜 License
This project is licensed under the **MIT License**.

---

You are free to use this project anywhere you want. Credit will be appreciated but its not needed.
