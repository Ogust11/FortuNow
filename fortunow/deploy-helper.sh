#!/bin/bash

# FortuNow - Deploy Helper Script
# Ce script aide à préparer le déploiement sur Vercel

echo "🚀 FortuNow - Préparation au déploiement"
echo "========================================"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé"
    echo "Assurez-vous d'être dans le répertoire /fortunow"
    exit 1
fi

# Afficher le plan
echo "📋 Plan de déploiement:"
echo "1. ✅ Vérification des dépendances"
echo "2. ⭐ Génération de la clé NEXTAUTH_SECRET"
echo "3. 🔧 Configuration des variables d'environnement"
echo "4. 📚 Vérification du schéma Prisma"
echo "5. 📤 Instructions de déploiement"
echo ""

# Étape 1: Vérifier les dépendances
echo "1️⃣  Vérification des dépendances..."
if [ -d "node_modules" ]; then
    echo "✅ Dépendances installées"
else
    echo "⚠️  Dépendances manquantes. Installer? (npm install)"
fi
echo ""

# Étape 2: Générer la clé
echo "2️⃣  Génération de la clé NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
echo "🔐 Clé générée: $NEXTAUTH_SECRET"
echo ""

# Étape 3: Afficher le contenu du .env.production
echo "3️⃣  Configuration pour Vercel (.env.production):"
echo "════════════════════════════════════════════"
cat > /tmp/env_prod.txt << EOF
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="$NEXTAUTH_SECRET"
NEXTAUTH_URL="https://YOUR_DOMAIN.vercel.app"
EOF
cat /tmp/env_prod.txt
echo "════════════════════════════════════════════"
echo ""
echo "⚠️  À faire sur Vercel:"
echo "1. Aller à Project Settings → Environment Variables"
echo "2. Copier les variables ci-dessus"
echo "3. Remplacer YOUR_DOMAIN par votre domaine Vercel"
echo ""

# Étape 4: Vérifier le schéma Prisma
echo "4️⃣  Vérification du schéma Prisma..."
if [ -f "prisma/schema.prisma" ]; then
    echo "✅ schéma.prisma trouvé"
    echo "   Models détectés:"
    grep "^model " prisma/schema.prisma | sed 's/model /   - /'
else
    echo "❌ schéma.prisma non trouvé"
fi
echo ""

# Étape 5: Instructions finales
echo "5️⃣  Instructions de déploiement:"
echo "════════════════════════════════════════════"
echo ""
echo "1. Pousser le code sur GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Aller sur vercel.com et créer un nouveau projet"
echo "3. Sélectionner votre repo GitHub"
echo "4. Ajouter les variables d'environnement (voir ci-dessus)"
echo "5. Cliquer 'Deploy'"
echo ""
echo "════════════════════════════════════════════"
echo ""
echo "✅ Préparation terminée!"
echo "📚 Voir DEPLOYMENT.md pour plus de détails"
