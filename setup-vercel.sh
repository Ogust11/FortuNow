#!/bin/bash
# Script automatisé - Exécutez dans le terminal

set -e  # Exit on error

echo "🚀 DÉPLOIEMENT VERCEL - SETUP AUTOMATISÉ"
echo "========================================"
echo ""

# ÉTAPE 2: Tester Localement
echo "📦 ÉTAPE 2: Nettoyer et réinstaller..."
rm -rf node_modules .next prisma/dev.db 2>/dev/null || true
echo "✅ Caches supprimés"

echo "📦 Installation npm..."
npm install --legacy-peer-deps
echo "✅ Dépendances installées"

echo "🔧 Générant client Prisma..."
npm run db:push
echo "✅ Client Prisma généré"

echo "🏗️  Compilant Next.js..."
npm run build
echo "✅ Build réussi"

echo ""
echo "✨ Test local (OPTIONNEL - Appuyez Ctrl+C pour arrêter):"
echo "   npm run dev"
echo "   Puis allez sur http://localhost:3000"
echo ""

# ÉTAPE 3: Supprimer fortunow/
echo "🗑️  ÉTAPE 3: Suppression du dossier redondant..."
if [ -d "fortunow" ]; then
    rm -rf fortunow/
    echo "✅ Dossier fortunow/ supprimé"
else
    echo "✅ Dossier fortunow/ n'existe pas"
fi

# ÉTAPE 4: Git Push
echo ""
echo "📤 ÉTAPE 4: Pushing vers GitHub..."
git add .
git commit -m "Fix: Prisma build configuration for Vercel deployment - Automated setup"
git push origin main
echo "✅ Changes pushés"

echo ""
echo "========================================"
echo "✅ ÉTAPES 2-4 COMPLÉTÉES"
echo "========================================"
echo ""
echo "❌ IL VOUS RESTE À FAIRE:"
echo ""
echo "ÉTAPE 1 - Configurer Vercel Dashboard (MANUAL):"
echo "  1. Allez sur: https://vercel.com/dashboard"
echo "  2. Sélectionnez 'FortuNow'"
echo "  3. Settings → Environment Variables"
echo "  4. Ajoutez:"
echo "     DATABASE_URL = [PostgreSQL URL]"
echo "     NEXTAUTH_SECRET = [openssl rand -base64 32]"
echo "     NEXTAUTH_URL = https://fortunow-xxxxx.vercel.app"
echo ""
echo "ÉTAPE 5 - Vérifier déploiement (MANUAL):"
echo "  1. Allez sur: https://vercel.com/dashboard/FortuNow"
echo "  2. Attendez que le déploiement finisse"
echo "  3. Vérifiez les logs (Build Logs)"
echo "  4. Visitez l'URL pour tester"
echo ""
echo "🎉 C'est presque prêt!"
