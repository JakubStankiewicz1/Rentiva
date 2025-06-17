#!/bin/bash

# Rentiva Start Script

echo "🚀 Starting Rentiva services..."

# Set environment variables
export SPRING_PROFILES_ACTIVE=prod
export PORT=${PORT:-8080}

# Start backend
echo "🔧 Starting Backend service..."
cd backend
java -jar target/backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
