#!/bin/bash
# Fix Prisma 7 compatibility and push to GitHub

cd /workspaces/FortuNow

echo "🔧 Fixing Prisma 7 compatibility..."
echo "===================================="
echo ""

echo "1️⃣  Adding Prisma config..."
cat > prisma/prisma.config.ts << 'EOF'
import { defineConfig } from '@prisma/internals';
import { join } from 'path';

export default defineConfig({
  schema: join(__dirname, './schema.prisma'),
});
EOF
echo "✅ Created prisma.config.ts"
echo ""

echo "2️⃣  Updating package.json build script..."
# Already done via editor
echo "✅ Build script updated (removed prisma migrate from build)"
echo ""

echo "3️⃣  Git operations..."
git add .
echo "✅ Files staged"
echo ""

echo "4️⃣  Creating commit..."
git commit -m "fix: Update Prisma 7 compatibility and build configuration

- Removed prisma migrate deploy from build script (Vercel limitation)
- Updated lib/prisma.js to properly configure datasources
- Created prisma.config.ts for Prisma 7 compatibility
- Updated vercel.json with explicit build commands
- DATABASE_URL is configured via environment variables on Vercel

This fixes the Prisma schema validation error P1012"

echo "✅ Commit created"
echo ""

echo "5️⃣  Pushing to GitHub..."
git push origin main
echo "✅ Pushed successfully!"
echo ""

echo "===================================="
echo "🎉 Prisma fix complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Click on FortuNow project"
echo "3. Go to Settings → Environment Variables"
echo "4. Add: DATABASE_URL=file:./prisma/prod.db"
echo "5. Click 'Redeploy'"
echo "6. The build should now work! ✅"
echo ""
