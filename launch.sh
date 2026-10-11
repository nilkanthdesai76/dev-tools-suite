#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
PORT=4200
echo "⚡ Starting DevForge Developer Suite on http://localhost:$PORT ..."
python3 -m http.server $PORT &
SERVER_PID=$!
sleep 0.8
open "http://localhost:$PORT"
echo "DevForge is running. Press Ctrl+C to stop."
wait $SERVER_PID
