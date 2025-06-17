#!/bin/bash

# Rentiva Production Start Script for Render

echo "🚀 Starting Rentiva Frontend..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Start the preview server
echo "🌐 Starting preview server..."
npm run preview -- --port ${PORT:-3000} --host 0.0.0.0
