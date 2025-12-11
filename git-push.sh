#!/bin/bash
# Git Push Script - Exécutez ceci dans le terminal

echo "📤 Vérification du statut Git..."
git status

echo ""
echo "📝 Ajout des fichiers..."
git add .

echo ""
echo "📝 Création du commit..."
git commit -m "Fix: Prisma build configuration for Vercel deployment

- Optimized npm scripts (prebuild/build/postbuild)
- Updated vercel.json with proper buildCommand
- Enhanced next.config.mjs with production config
- Added environment variable templates
- Removed redundant fortunow/ folder
- Added complete Vercel deployment guide and automation script"

echo ""
echo "📤 Pushing vers GitHub..."
git push origin main

echo ""
echo "✅ Push complété!"
echo ""
echo "Vérifiez sur: https://github.com/Ogust11/FortuNow"
