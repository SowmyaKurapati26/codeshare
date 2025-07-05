# Quick Start Guide

Get CodeShare up and running in 5 minutes!

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/codeshare.git
cd codeshare
npm run install-all
```

### 2. Environment Setup

#### Backend
```bash
cd server
cp env.example .env
# Edit .env with your configuration
```

#### Frontend
```bash
cd ../client
cp env.example .env
# Edit .env with your configuration
```

### 3. Start Development Servers

```bash
# From the root directory
npm run dev
```

This will start both the frontend (port 3000) and backend (port 5000) servers.

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codeshare
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Quick Test

1. Open http://localhost:3000
2. Register a new account or use Google OAuth
3. Create a new room
4. Share the room URL with others
5. Start coding together!

## Common Issues

### MongoDB Connection
- Make sure MongoDB is running locally or use MongoDB Atlas
- Check your connection string in the backend `.env` file

### Port Conflicts
- If port 3000 is busy, React will automatically use the next available port
- If port 5000 is busy, change it in the backend `.env` file

### Google OAuth
- Set up OAuth credentials in Google Cloud Console
- Add localhost:3000 to authorized origins
- Add localhost:5000/api/auth/google/callback to redirect URIs

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out the [DEPLOYMENT.md](DEPLOYMENT.md) guide for production deployment
- Join our community discussions in [GitHub Issues](https://github.com/yourusername/codeshare/issues)

## Need Help?

- Check the [troubleshooting section](README.md#troubleshooting) in the README
- Open an issue on GitHub
- Join our community discussions

Happy coding! 🚀 