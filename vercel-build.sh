#!/bin/bash
# Post-build script for Vercel
# Runs after the Next.js build completes

echo "🔧 Running post-build setup..."

# Create .env.production with DATABASE_URL if not exists
if [ ! -f ".env.production" ]; then
  echo "DATABASE_URL=\"file:./prisma/prod.db\"" > .env.production
fi

echo "✅ Post-build setup complete"
