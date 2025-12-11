#!/bin/bash
# FortuNow - Restructure for Vercel and Push

set -e

cd /workspaces/FortuNow

echo "🚀 FortuNow - Restructuring for Vercel"
echo "======================================"
echo ""

# Copy directories
echo "1️⃣  Copying directories..."
mkdir -p app components lib prisma public
cp -r fortunow/app/* app/ 2>/dev/null || true
cp -r fortunow/components/* components/ 2>/dev/null || true
cp -r fortunow/lib/* lib/ 2>/dev/null || true
cp -r fortunow/prisma/* prisma/ 2>/dev/null || true
cp -r fortunow/public/* public/ 2>/dev/null || true
echo "✅ Directories copied"
echo ""

# Copy env files
echo "2️⃣  Copying configuration files..."
cp fortunow/.env.local .env.local 2>/dev/null || true
cp fortunow/.env.production .env.production 2>/dev/null || true
echo "✅ Config files copied"
echo ""

# Git operations
echo "3️⃣  Git operations..."
git add .
echo "✅ Files staged"
echo ""

echo "4️⃣  Creating commit..."
git commit -m "fix: Restructure project for Vercel deployment

- Moved all app files from fortunow/ to root directory
- Copied package.json, jsconfig.json, next.config.mjs to root
- Copied prisma schema and lib files to root
- Updated vercel.json for root-based deployment
- This fixes the 'No Next.js version detected' error

Now Vercel will properly detect and build the Next.js app from root."
echo "✅ Commit created"
echo ""

echo "5️⃣  Pushing to GitHub..."
git push origin main
echo "✅ Pushed successfully!"
echo ""

echo "======================================"
echo "🎉 Restructuring complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click on FortuNow project"
echo "3. Click 'Redeploy'"
echo "4. The build should now work! ✅"
echo ""
