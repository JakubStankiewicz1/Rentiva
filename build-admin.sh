#!/bin/bash

# Build script for admin panel
echo "Starting admin build process..."
echo "Current directory: $(pwd)"

# Navigate to admin directory
cd admin

# List contents to verify structure
echo "Admin directory contents:"
ls -la

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found in admin directory"
    exit 1
fi

# Check if vite.config.js exists
if [ ! -f "vite.config.js" ]; then
    echo "ERROR: vite.config.js not found in admin directory"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci --verbose

# Check if vite is installed
echo "Checking for vite installation..."
if ! npm list vite; then
    echo "ERROR: vite not found in node_modules"
    exit 1
fi

# Build the application
echo "Building admin application..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "Build successful! Dist folder created."
    ls -la dist/
else
    echo "Build failed! Dist folder not found."
    exit 1
fi

echo "Admin build completed successfully!"
