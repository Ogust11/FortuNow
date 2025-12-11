#!/bin/bash

# Copier app/
mkdir -p /workspaces/FortuNow/app
cp -r /workspaces/FortuNow/fortunow/app/* /workspaces/FortuNow/app/ || true

# Copier components/
mkdir -p /workspaces/FortuNow/components
cp -r /workspaces/FortuNow/fortunow/components/* /workspaces/FortuNow/components/ || true

# Copier public/
mkdir -p /workspaces/FortuNow/public
cp -r /workspaces/FortuNow/fortunow/public/* /workspaces/FortuNow/public/ || true

# Copier .env files
cp /workspaces/FortuNow/fortunow/.env.local /workspaces/FortuNow/.env.local || true
cp /workspaces/FortuNow/fortunow/.env.production /workspaces/FortuNow/.env.production || true

echo "✅ Files copied successfully!"
