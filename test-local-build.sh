#!/bin/bash

echo "=== TESTING RENTIVA BACKEND BUILD ==="
echo "This script tests if the backend can be built successfully"
echo

# Navigate to backend directory
cd backend

echo "1. Cleaning previous builds..."
./mvnw clean

echo
echo "2. Running tests..."
./mvnw test

echo
echo "3. Building application..."
./mvnw package -DskipTests

echo
echo "4. Checking if JAR was created..."
if [ -f "target/backend-0.0.1-SNAPSHOT.jar" ]; then
    echo "✅ JAR file created successfully!"
    ls -la target/backend-0.0.1-SNAPSHOT.jar
else
    echo "❌ JAR file not found!"
    exit 1
fi

echo
echo "5. Checking JAR contents..."
jar tf target/backend-0.0.1-SNAPSHOT.jar | head -10

echo
echo "✅ Build test completed successfully!"
echo "The application should deploy correctly on Render."
