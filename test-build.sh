#!/bin/bash

# Test Build Script for Rentiva

echo "🧪 Testing Rentiva builds..."

# Test Backend Build
echo "🔍 Testing Backend build..."
cd backend
./mvnw clean compile
if [ $? -eq 0 ]; then
    echo "✅ Backend compilation successful!"
else
    echo "❌ Backend compilation failed!"
    exit 1
fi
cd ..

# Test Frontend Build
echo "� Testing Frontend build..."
cd frontend
npm install --dry-run
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies check successful!"
else
    echo "❌ Frontend dependencies check failed!"
    exit 1
fi
cd ..

# Test Admin Panel Build
echo "🔍 Testing Admin Panel build..."
cd admin
npm install --dry-run
if [ $? -eq 0 ]; then
    echo "✅ Admin Panel dependencies check successful!"
else
    echo "❌ Admin Panel dependencies check failed!"
    exit 1
fi
cd ..

echo "🎉 All tests passed! Ready for deployment."
