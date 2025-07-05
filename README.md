# CodeShare - Real-time Collaborative Code Editor

A real-time collaborative code editor built with React, Node.js, and Socket.IO that allows multiple users to write, edit, and execute code together in real-time.

## 🚀 Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously with live updates
- **Code Execution**: Execute code in multiple programming languages
- **User Authentication**: Secure login/register system with Google OAuth support
- **Room Management**: Create and join coding rooms with unique URLs
- **Syntax Highlighting**: Monaco Editor with syntax highlighting for various languages
- **Responsive Design**: Modern UI built with Tailwind CSS
- **WebSocket Communication**: Real-time updates using Socket.IO

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Monaco Editor** - Code editor component
- **Socket.IO Client** - Real-time communication
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Passport.js** - OAuth authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Google OAuth credentials (for authentication)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/SowmyaKurapati26/codeshare.git
cd codeshare
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 3. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Frontend Environment Variables
Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### 4. Run the application

#### Start the backend server
```bash
cd server
npm run dev
```

#### Start the frontend development server
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
codeshare/
├── client/                 # React frontend
│   ├── public/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── sockets.js        # Socket.IO configuration
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - User logout

### Rooms
- `POST /api/room/create` - Create a new room
- `GET /api/room/:roomId` - Get room details
- `DELETE /api/room/:roomId` - Delete room

### Code Execution
- `POST /api/execute` - Execute code

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd client
npm run build
```

2. Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

3. Deploy to Netlify:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Backend Deployment (Heroku/Railway)

1. Create a `Procfile` in the server directory:
```
web: node index.js
```

2. Deploy to Heroku:
```bash
heroku create your-app-name
git push heroku main
```

3. Set environment variables in your deployment platform:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📫 Contact

For questions, contributions, or collaboration, feel free to reach out:

**📧 Email:** kurapatisowmya1@gmail.com

Made with ❤️ by Sowmya Kurapati.
