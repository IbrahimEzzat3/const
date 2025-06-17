#!/bin/bash

# Deployment Script for Railway + Vercel
# This script helps prepare your project for deployment

echo "🚀 Preparing your project for deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-github-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if .env files exist and warn about them
if [ -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file exists. Make sure it's in .gitignore"
fi

if [ -f "client/.env" ]; then
    echo "⚠️  Warning: client/.env file exists. Make sure it's in .gitignore"
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "server/package.json"
    "server/server.js"
    "server/railway.json"
    "client/package.json"
    "client/vercel.json"
    "DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - Missing!"
    fi
done

echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub repo"
echo "   - Set root directory to 'server/'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repo"
echo "   - Set root directory to 'client/'"
echo "   - Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🔧 Environment Variables Checklist:"
echo ""
echo "Backend (Railway):"
echo "  - MONGODB_URI"
echo "  - JWT_SECRET"
echo "  - INITIAL_ADMIN_* (all 4 variables)"
echo "  - CLIENT_URL (update after frontend deployment)"
echo ""
echo "Frontend (Vercel):"
echo "  - VITE_API_URL (point to your Railway backend)"
echo ""
echo "✅ Deployment preparation complete!" 