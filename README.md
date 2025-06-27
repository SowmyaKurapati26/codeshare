# 💻 CodeShare – Real-Time Code Collaboration App

> ✨ Google Docs for Code – Collaborate, Chat, and Run Code Live

CodeShare is a real-time code collaboration platform where multiple users can write, edit, and run code together — just like Google Docs but for developers. Features include real-time syncing via Socket.IO, Monaco editor with syntax highlighting, Google OAuth login, and integrated chat.

## 🧩 Features

✅ Real-time collaborative coding (Socket.IO)  
✅ Monaco code editor (like VS Code in browser)  
✅ Run code in multiple languages via Judge0 API  
✅ Google OAuth and JWT login  
✅ Real-time in-room chat  
✅ Room creation, joining with unique room IDs  
✅ Auto-saving code sessions to MongoDB  
✅ Responsive UI with Tailwind CSS  

---

## ⚙ Tech Stack

| Layer          | Tech Stack                                    |
| -------------- | --------------------------------------------- |
| Frontend       | React.js, Tailwind CSS, Monaco Editor         |
| Backend        | Node.js, Express.js                           |
| Real-time      | Socket.IO                                     |
| Database       | MongoDB with Mongoose                         |
| Auth           | JWT + Google OAuth2.0                         |
| Code Execution | Judge0 API                                    |
| Deployment     | Vercel (frontend) + Render/Railway (backend)  |

## 🌐 Environment Variables (.env)

| Variable               | Description                   |
| ---------------------- | ----------------------------- |
| `MONGO_URI`            | MongoDB connection string     |
| `JWT_SECRET`           | Secret for signing JWT tokens |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID        |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret    |
| `JUDGE0_API_KEY`       | (Optional) Judge0 API key     |

---

## 🤖 Run Code via Judge0 API

* Backend sends user code and language ID to Judge0 API
* Receives output and returns it to frontend
* Language IDs are mapped in `languageMap.js`

---
## 🙋‍♀️ Author
👤 **Sowmya Kurapati**
