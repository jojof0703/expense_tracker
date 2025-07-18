#!/bin/bash

# Deployment script for Spending Tracker
echo "🚀 Deploying Spending Tracker to GitHub Pages..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/spending-tracker.git"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Commit and push changes
echo "📝 Committing changes..."
git add .
git commit -m "Update spending tracker app"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Pages"
echo "3. Set source to 'GitHub Actions'"
echo "4. Wait for the deployment to complete"
echo "5. Your app will be available at: https://yourusername.github.io/spending-tracker"
echo ""
echo "💡 Make sure to update the 'homepage' field in package.json with your actual GitHub username!"