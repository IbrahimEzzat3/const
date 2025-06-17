# Deployment Guide: Railway + Vercel

This guide will help you deploy your construction company website with the backend on Railway and frontend on Vercel.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Railway Account**: Sign up at [railway.app](https://railway.app)
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas Account**: For database hosting (recommended)

## Backend Deployment (Railway)

### Step 1: Prepare MongoDB Database

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### Step 2: Deploy to Railway

1. **Connect GitHub Repository**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure the Service**:
   - Railway will automatically detect it's a Node.js project
   - Set the root directory to `server/`
   - Railway will use the `railway.json` configuration

3. **Set Environment Variables**:
   In Railway dashboard, go to your service → Variables tab and add:

   ```env
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   
   # Email Configuration (for password reset functionality)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Initial Admin User (change these values)
   INITIAL_ADMIN_NAME=Your Name
   INITIAL_ADMIN_EMAIL=your-email@example.com
   INITIAL_ADMIN_PASSWORD=YourSecurePassword123!
   INITIAL_ADMIN_ROLE=admin
   
   # Client URL (will be updated after frontend deployment)
   CLIENT_URL=https://your-frontend-domain.vercel.app
   
   NODE_ENV=production
   PORT=5000
   ```

4. **Deploy**:
   - Railway will automatically build and deploy your application
   - You'll get a URL like: `https://your-app-name.railway.app`

### Step 3: Test Backend

1. Visit `https://your-app-name.railway.app/api/health`
2. You should see a JSON response indicating the server is running

## Frontend Deployment (Vercel)

### Step 1: Prepare Environment Variables

1. Create a `.env` file in the `client/` directory:

   ```env
   VITE_API_URL=https://your-app-name.railway.app/api
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the Project**:
   - Framework Preset: Vite
   - Root Directory: `client/`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**:
   In Vercel dashboard, go to your project → Settings → Environment Variables:

   ```env
   VITE_API_URL=https://your-app-name.railway.app/api
   ```

4. **Deploy**:
   - Vercel will automatically build and deploy your application
   - You'll get a URL like: `https://your-app-name.vercel.app`

### Step 3: Update Backend CORS

1. Go back to Railway dashboard
2. Update the `CLIENT_URL` environment variable to your Vercel domain:
   ```env
   CLIENT_URL=https://your-app-name.vercel.app
   ```
3. Redeploy the backend service

## Post-Deployment Setup

### 1. Test the Application

1. Visit your Vercel frontend URL
2. Test user registration and login
3. Test admin functionality
4. Test file uploads and other features

### 2. Set Up Custom Domain (Optional)

**For Vercel (Frontend)**:
1. Go to Vercel dashboard → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

**For Railway (Backend)**:
1. Go to Railway dashboard → Settings → Domains
2. Add your custom domain
3. Update the `CLIENT_URL` environment variable

### 3. Set Up Email Service

For password reset functionality:

1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate an app password
   - Use the app password in `EMAIL_PASS`

2. **Alternative Email Services**:
   - SendGrid
   - Mailgun
   - AWS SES

## Environment Variables Reference

### Backend (Railway)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `your-secret-key` |
| `JWT_EXPIRE` | JWT token expiration | No | `30d` |
| `JWT_COOKIE_EXPIRE` | Cookie expiration days | No | `30` |
| `EMAIL_HOST` | SMTP host for emails | No | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | No | `587` |
| `EMAIL_USER` | Email username | No | `your-email@gmail.com` |
| `EMAIL_PASS` | Email password/app password | No | `your-app-password` |
| `INITIAL_ADMIN_NAME` | First admin name | Yes | `Admin User` |
| `INITIAL_ADMIN_EMAIL` | First admin email | Yes | `admin@example.com` |
| `INITIAL_ADMIN_PASSWORD` | First admin password | Yes | `SecurePass123!` |
| `INITIAL_ADMIN_ROLE` | First admin role | Yes | `admin` |
| `CLIENT_URL` | Frontend URL for CORS | Yes | `https://your-app.vercel.app` |
| `NODE_ENV` | Environment | No | `production` |
| `PORT` | Server port | No | `5000` |

### Frontend (Vercel)

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | Yes | `https://your-app.railway.app/api` |

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `CLIENT_URL` in Railway matches your Vercel domain exactly
   - Check that the URL includes the protocol (https://)

2. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is compatible (>=16.0.0)

3. **Database Connection Issues**:
   - Verify MongoDB Atlas network access settings
   - Check that the connection string is correct
   - Ensure database user has proper permissions

4. **Environment Variables**:
   - Double-check all environment variables are set correctly
   - Ensure no extra spaces or quotes in values

### Getting Help

- **Railway**: Check Railway logs in the dashboard
- **Vercel**: Check Vercel build logs and function logs
- **MongoDB**: Check MongoDB Atlas logs and connection status

## Security Considerations

1. **JWT Secret**: Use a strong, random secret key
2. **Database**: Use MongoDB Atlas with proper authentication
3. **Environment Variables**: Never commit sensitive data to Git
4. **CORS**: Only allow your frontend domain
5. **Rate Limiting**: Already configured in the backend
6. **HTTPS**: Both Railway and Vercel provide HTTPS by default

## Monitoring

1. **Railway**: Monitor logs, resource usage, and deployments
2. **Vercel**: Monitor build status, function logs, and analytics
3. **MongoDB Atlas**: Monitor database performance and connections

## Updates and Maintenance

1. **Automatic Deployments**: Both Railway and Vercel deploy automatically on Git pushes
2. **Environment Variables**: Update as needed through the respective dashboards
3. **Database Backups**: MongoDB Atlas provides automatic backups
4. **SSL Certificates**: Automatically managed by both platforms 