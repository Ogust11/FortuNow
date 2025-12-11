#!/bin/bash

# Script de vérification avant déploiement
echo "🔍 Vérification de la structure du projet..."
echo ""

cd /workspaces/FortuNow/fortunow

# Vérifier les fichiers critiques
echo "📁 Fichiers critiques:"
for file in \
  ".env.local" \
  ".env.production" \
  "package.json" \
  "vercel.json" \
  "prisma/schema.prisma" \
  "DEPLOYMENT.md" \
  "DEPLOYMENT_CHECKLIST.md"
do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file - MANQUANT"
  fi
done

echo ""
echo "📦 Répertoires critiques:"
for dir in \
  "app" \
  "components" \
  "lib" \
  "prisma" \
  "public"
do
  if [ -d "$dir" ]; then
    echo "✅ $dir/"
  else
    echo "❌ $dir/ - MANQUANT"
  fi
done

echo ""
echo "🔐 Secret NextAuth:"
if grep -q "NEXTAUTH_SECRET" .env.local; then
  echo "✅ Secret détecté dans .env.local"
else
  echo "⚠️  Ajouter NEXTAUTH_SECRET dans .env.local"
fi

echo ""
echo "✅ Vérification complète!"
