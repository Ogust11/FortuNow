#!/bin/bash

# Script de push automatique vers GitHub
# Usage: bash push-to-github.sh

set -e  # Exit on error

echo "🚀 FortuNow - Push automatique sur GitHub"
echo "=========================================="
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Ce script doit être exécuté depuis /workspaces/FortuNow/fortunow"
    exit 1
fi

# Vérifier git
if ! command -v git &> /dev/null; then
    echo "❌ git n'est pas installé"
    exit 1
fi

echo "✅ Vérifications passées"
echo ""

# Étape 1: Afficher le statut actuel
echo "1️⃣  Statut du repo:"
git status --short | head -20
echo ""

# Étape 2: Ajouter tous les fichiers
echo "2️⃣  Ajout de tous les fichiers..."
git add .
echo "✅ Fichiers ajoutés"
echo ""

# Étape 3: Créer le commit
echo "3️⃣  Création du commit..."
git commit -m "feat: FortuNow - Tier 1 & Tier 2 fully implemented with Vercel deployment

✨ Features:
- Tier 1: Authentication (NextAuth), Database (Prisma), Dashboard, Advanced Search, Charts
- Tier 2: Favorites system, Global leaderboard, Detailed statistics, Notifications, Enhanced UI/UX

🚀 Deployment:
- Vercel configuration (vercel.json)
- Automated migrations on build
- Environment variables configured
- Production-ready setup

📚 Documentation:
- DEPLOYMENT.md - Complete deployment guide
- DEPLOYMENT_CHECKLIST.md - Pre-deployment checklist
- DEPLOYMENT_SUMMARY.md - Overview

🔧 Technical:
- Next.js 16 + React 19
- Tailwind CSS + Lucide Icons
- Recharts for analytics
- SQLite + Prisma ORM
- NextAuth for authentication

Ready to deploy on Vercel!"

echo "✅ Commit créé"
echo ""

# Étape 4: Pousser
echo "4️⃣  Push sur GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Push réussi!"
    echo ""
    echo "════════════════════════════════════════════"
    echo "🎉 Prêt pour Vercel!"
    echo "════════════════════════════════════════════"
    echo ""
    echo "Prochaines étapes:"
    echo "1. Va sur https://vercel.com"
    echo "2. Clique 'Add New Project'"
    echo "3. Importe le repo Ogust11/FortuNow"
    echo "4. Ajoute les variables d'environnement:"
    echo "   - DATABASE_URL = file:./prisma/dev.db"
    echo "   - NEXTAUTH_SECRET = K7x9mP2qL5nR8vT1hB4jD6gF3wS0zC8eY9uX2qW5pM8nV1lK7sH4bJ6tD3fR9vG2"
    echo "   - NEXTAUTH_URL = https://fortunow-YOUR_NAME.vercel.app"
    echo "5. Clique 'Deploy'"
    echo ""
    echo "✅ C'est tout!"
else
    echo "❌ Erreur lors du push"
    exit 1
fi
