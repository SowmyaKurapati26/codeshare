# Deployment Guide

This guide will help you deploy CodeShare to various platforms.

## Prerequisites

Before deploying, make sure you have:

1. **MongoDB Database**: Set up a MongoDB database (local or cloud-based like MongoDB Atlas)
2. **Google OAuth Credentials**: Create OAuth 2.0 credentials in Google Cloud Console
3. **Environment Variables**: Prepare all necessary environment variables

## Environment Variables Setup

### Backend Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SESSION_SECRET=your_session_secret_here
```

### Frontend Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```env
REACT_APP_API_URL=your_backend_url_here
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend Deployment on Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Configure environment variables** in Vercel dashboard:
   - `REACT_APP_API_URL`: Your backend URL
   - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google Client ID

#### Backend Deployment on Railway

1. **Create Railway account** and connect your GitHub repository

2. **Deploy the server directory**:
   - Select the `server` folder as the source
   - Railway will automatically detect it's a Node.js app

3. **Set environment variables** in Railway dashboard:
   - `PORT`: 5000
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret
   - `SESSION_SECRET`: Your session secret

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend Deployment on Netlify

1. **Connect your GitHub repository** to Netlify

2. **Configure build settings**:
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/build`

3. **Set environment variables** in Netlify dashboard:
   - `REACT_APP_API_URL`: Your backend URL
   - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google Client ID

#### Backend Deployment on Heroku

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create Heroku app**:
   ```bash
   cd server
   heroku create your-app-name
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
   heroku config:set SESSION_SECRET=your_session_secret
   ```

5. **Deploy to Heroku**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: Full Stack Deployment on Render

1. **Create Render account** and connect your GitHub repository

2. **Deploy Backend Service**:
   - Create a new Web Service
   - Select the `server` directory
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

3. **Deploy Frontend Service**:
   - Create a new Static Site
   - Select the `client` directory
   - Set build command: `npm install && npm run build`
   - Set publish directory: `build`
   - Add environment variables

## Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas account**
2. **Create a new cluster**
3. **Set up database access** (username/password)
4. **Set up network access** (IP whitelist or 0.0.0.0/0 for all)
5. **Get connection string** and use it as `MONGO_URI`

### Local MongoDB

For development, you can use a local MongoDB instance:

```env
MONGO_URI=mongodb://localhost:27017/codeshare
```

## Google OAuth Setup

1. **Go to Google Cloud Console**
2. **Create a new project** or select existing one
3. **Enable Google+ API**
4. **Create OAuth 2.0 credentials**:
   - Application type: Web application
   - Authorized JavaScript origins: Your frontend URL
   - Authorized redirect URIs: Your backend URL + `/api/auth/google/callback`
5. **Copy Client ID and Client Secret**

## Post-Deployment Checklist

- [ ] Test user registration and login
- [ ] Test Google OAuth authentication
- [ ] Test room creation and joining
- [ ] Test real-time code collaboration
- [ ] Test code execution
- [ ] Verify all environment variables are set correctly
- [ ] Check CORS settings if needed
- [ ] Test on different devices and browsers

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend CORS settings include your frontend URL
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database Connection**: Verify MongoDB connection string and network access
4. **OAuth Redirect**: Ensure redirect URIs match exactly in Google Console

### Debug Commands

```bash
# Check if backend is running
curl your-backend-url/api/auth/me

# Check environment variables
heroku config  # For Heroku
railway variables  # For Railway
```

## Monitoring and Maintenance

- Set up logging for production
- Monitor database performance
- Set up alerts for downtime
- Regular security updates
- Database backups

## Cost Optimization

- Use free tiers when possible
- Monitor usage and upgrade only when needed
- Consider serverless options for cost efficiency 