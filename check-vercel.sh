#!/bin/bash
# Quick Vercel Deployment Verification Script

echo "🔍 Vérification de la Configuration Vercel..."
echo ""

# 1. Check package.json scripts
echo "1️⃣  Vérification des scripts npm..."
if grep -q '"prebuild"' package.json && grep -q '"postbuild"' package.json; then
    echo "   ✅ Scripts prebuild et postbuild présents"
else
    echo "   ❌ Scripts manquants! Relancez: npm run db:push"
fi

# 2. Check vercel.json
echo ""
echo "2️⃣  Vérification de vercel.json..."
if [ -f "vercel.json" ]; then
    if grep -q '"buildCommand"' vercel.json; then
        echo "   ✅ vercel.json configuré correctement"
    else
        echo "   ❌ vercel.json mal configuré"
    fi
else
    echo "   ❌ vercel.json manquant!"
fi

# 3. Check .env files
echo ""
echo "3️⃣  Vérification des fichiers .env..."
if [ -f ".env.local" ]; then
    echo "   ✅ .env.local existe"
else
    echo "   ⚠️  .env.local manquant (sera utilisé pour dev)"
fi

if [ -f ".env.example" ]; then
    echo "   ✅ .env.example existe"
else
    echo "   ⚠️  .env.example manquant"
fi

# 4. Check Prisma
echo ""
echo "4️⃣  Vérification de Prisma..."
if [ -d "node_modules/.prisma/client" ]; then
    echo "   ✅ Client Prisma généré"
else
    echo "   ⚠️  Client Prisma non généré (exécutez: npm run db:push)"
fi

if [ -f "prisma/schema.prisma" ]; then
    echo "   ✅ Schema Prisma présent"
else
    echo "   ❌ Schema Prisma manquant!"
fi

# 5. Check for unfortunow folder
echo ""
echo "5️⃣  Vérification de la structure..."
if [ -d "fortunow" ]; then
    echo "   ⚠️  Dossier 'fortunow/' détecté (À SUPPRIMER)"
    echo "       Commande: rm -rf fortunow/"
else
    echo "   ✅ Pas de dossier redondant"
fi

# 6. Check next config
echo ""
echo "6️⃣  Vérification de next.config.mjs..."
if [ -f "next.config.mjs" ]; then
    echo "   ✅ next.config.mjs existe"
else
    echo "   ❌ next.config.mjs manquant!"
fi

echo ""
echo "=========================================="
echo "📋 RÉSUMÉ DES ACTIONS REQUISES:"
echo "=========================================="
echo ""
echo "LOCAL (avant de pousser):"
echo "  1. rm -rf node_modules .next prisma/dev.db"
echo "  2. npm install"
echo "  3. npm run db:push"
echo "  4. npm run build"
echo "  5. npm run dev (tester localement)"
echo ""
echo "SUR VERCEL DASHBOARD:"
echo "  1. Settings → Environment Variables"
echo "  2. Ajouter DATABASE_URL (PostgreSQL)"
echo "  3. Ajouter NEXTAUTH_SECRET"
echo "  4. Ajouter NEXTAUTH_URL (https://your-domain.vercel.app)"
echo "  5. Redéployer"
echo ""
echo "GIT:"
echo "  1. git add ."
echo "  2. git commit -m 'Fix: Prisma build config'"
echo "  3. git push origin main"
echo ""
echo "✅ Prêt pour le déploiement!"
