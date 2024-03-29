#!/bin/bash

# Set variables
CLIENT_PATH="./src/frontend/svs"
CLIENT_DIR="$CLIENT_PATH/build/"

SERVER_PATH="./src/server"
SERVER_DIR="$SERVER_PATH/public"

# Clean client and server
rm -rf $CLIENT_DIR $SERVER_DIR

# Build client bundle
(cd $CLIENT_PATH && npm run build)

# Copy build to server
cp -rv $CLIENT_DIR $SERVER_DIR

