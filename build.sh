#!/bin/bash

# Rentiva Deployment Script for Render.com

echo "🚀 Starting Rentiva deployment process..."

# Build Backend
echo "📦 Building Backend..."
cd backend
./mvnw clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi
echo "✅ Backend build successful!"
cd ..

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
echo "✅ Frontend build successful!"
cd ..

# Build Admin Panel
echo "📦 Building Admin Panel..."
cd admin
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Admin Panel build failed!"
    exit 1
fi
echo "✅ Admin Panel build successful!"
cd ..

echo "🎉 All builds completed successfully!"
echo "Ready for deployment to Render.com"
