# Quick Deployment Guide

## Prerequisites
- GitHub repository with your code
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://mongodb.com)

## Quick Steps

### 1. Prepare Your Code
```bash
# Make sure all files are committed
git add .
git commit -m "Prepare for deployment"
git push
```

### 2. Deploy Backend (Railway)

1. Go to [Railway Dashboard](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `server/`
5. Add environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key-here
INITIAL_ADMIN_NAME=Admin User
INITIAL_ADMIN_EMAIL=admin@example.com
INITIAL_ADMIN_PASSWORD=Admin123!
INITIAL_ADMIN_ROLE=admin
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

6. Deploy and get your backend URL (e.g., `https://your-app.railway.app`)

### 3. Deploy Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Set root directory to `client/`
4. Add environment variable:

```env
VITE_API_URL=https://your-app.railway.app/api
```

5. Deploy and get your frontend URL (e.g., `https://your-app.vercel.app`)

### 4. Update Backend CORS

1. Go back to Railway dashboard
2. Update `CLIENT_URL` to your Vercel domain
3. Redeploy the backend

## Environment Variables Summary

### Railway (Backend)
| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Random secret key |
| `INITIAL_ADMIN_NAME` | Admin name |
| `INITIAL_ADMIN_EMAIL` | Admin email |
| `INITIAL_ADMIN_PASSWORD` | Admin password |
| `INITIAL_ADMIN_ROLE` | `admin` |
| `CLIENT_URL` | Your Vercel frontend URL |
| `NODE_ENV` | `production` |

### Vercel (Frontend)
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Railway backend URL + `/api` |

## Test Your Deployment

1. Visit your Vercel frontend URL
2. Test registration/login
3. Test admin functionality
4. Check backend health: `https://your-app.railway.app/api/health`

## Troubleshooting

- **CORS errors**: Check `CLIENT_URL` in Railway matches Vercel domain exactly
- **Build failures**: Check Railway/Vercel logs for specific errors
- **Database issues**: Verify MongoDB Atlas connection string and network access
- **Environment variables**: Ensure no extra spaces or quotes

## Support

- **Railway**: Check logs in Railway dashboard
- **Vercel**: Check build logs in Vercel dashboard
- **Full Guide**: See `DEPLOYMENT.md` for detailed instructions 