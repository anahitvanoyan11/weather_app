#!/bin/bash

# Start API service
cd api_service && npm start &
API_PID=$!

# Start Worker service
cd worker_service && npm start &
WORKER_PID=$!

# Function to handle script termination
cleanup() {
    echo "Shutting down services..."
    kill $API_PID
    kill $WORKER_PID
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Wait for both processes
wait $API_PID $WORKER_PID 