# 🚀 Guide Complet de Déploiement sur Vercel

## ⚠️ PROBLÈMES RÉSOLUS

### 1. **Prisma Client Non Généré**
   - **Problème**: `Cannot find module '.prisma/client/default'`
   - **Cause**: Prisma n'était pas généré avant le build Next.js
   - **Solution**: Ajout de `prebuild` script dans package.json

### 2. **Manque de Variables d'Environnement**
   - **Problème**: `DATABASE_URL` non définie sur Vercel
   - **Cause**: Les variables d'environnement ne sont pas synchronisées automatiquement
   - **Solution**: Définies dans vercel.json et à configurer dans Vercel Dashboard

### 3. **Build Order Incorrect**
   - **Ancien**: `prisma generate && next build` (tout dans un script)
   - **Nouveau**: `prebuild` → `build` → `postbuild` (étapes séparées)

### 4. **Dossier Redondant**
   - **Problème**: Dossier `fortunow/` crée une confusion
   - **Recommandation**: À supprimer

---

## 🔧 ÉTAPES DE DÉPLOIEMENT SUR VERCEL

### **ÉTAPE 1: Préparer la Base de Données**

#### Option A: SQLite (Développement Local UNIQUEMENT)
```bash
# Local only
DATABASE_URL="file:./prisma/dev.db"
```

#### Option B: PostgreSQL (Recommandé pour Production)
```bash
# Utiliser Prisma Data Platform ou une DB externe
DATABASE_URL="postgresql://user:password@host:5432/database_name"
```

> ⚠️ **SQLite ne fonctionne PAS en production sur Vercel** (filesystem readonly)

### **ÉTAPE 2: Initialiser Prisma Localement**
```bash
# 1. Générer le client Prisma
npm run db:push

# 2. Vérifier que .prisma/client est créé
ls -la node_modules/.prisma/client/
```

### **ÉTAPE 3: Configurer Vercel**

#### Via Vercel Dashboard:
1. **Allez à** Settings → Environment Variables
2. **Ajoutez**:
   ```
   DATABASE_URL = postgresql://... (votre chaîne de connexion)
   NEXTAUTH_SECRET = <générez une clé secrète>
   NEXTAUTH_URL = https://your-domain.vercel.app
   NODE_ENV = production
   ```

3. **Redéployer** (Vercel re-exécutera le build)

#### Via Vercel CLI:
```bash
vercel env add DATABASE_URL
# Puis entrez votre URL de DB
```

### **ÉTAPE 4: Push du Code**
```bash
git add .
git commit -m "Fix: Prisma build configuration for Vercel"
git push origin main
```

### **ÉTAPE 5: Vérifier le Build sur Vercel**

#### Checklist:
- ✅ `npm install` - 484 packages
- ✅ `npm run prebuild` - `prisma generate` complète
- ✅ `npm run build` - Next.js compile sans erreurs
- ✅ `npm run postbuild` - `prisma db push --skip-generate` réussit
- ✅ Déploiement sur Vercel réussit

---

## 📋 VÉRIFICATIONS LOCALES AVANT DÉPLOIEMENT

```bash
# 1. Vérifier que Prisma client est généré
npm run db:push

# 2. Tester le build complet
npm run build

# 3. Vérifier l'absence d'erreurs TypeScript
npm run lint

# 4. Tester localement
npm run dev
# Accédez à http://localhost:3000
```

---

## 🐛 TROUBLESHOOTING

### Erreur: "Cannot find module '.prisma/client/default'"
```bash
# Solution:
rm -rf node_modules .next prisma/dev.db
npm install
npm run db:push
```

### Erreur: "DATABASE_URL not found"
```bash
# Vercel Dashboard:
1. Settings → Environment Variables
2. Vérifiez que DATABASE_URL est défini
3. Redéployer la branche
```

### Erreur: "NEXTAUTH_SECRET not set"
```bash
# Générer une clé:
openssl rand -base64 32

# Ajouter à Vercel:
vercel env add NEXTAUTH_SECRET
```

### Build timeout (plus de 45 secondes)
- Vérifiez la complexité de vos données
- Optimisez les requêtes Prisma
- Considérez migrer vers PostgreSQL

---

## 📊 Structure Corrigée

```
/workspaces/FortuNow/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...]nextauth]/route.js  ✅
│   │       └── register/route.js        ✅
│   ├── layout.js
│   └── page.js
├── components/
├── lib/
│   └── prisma.js                        ✅
├── prisma/
│   └── schema.prisma                    ✅
├── .env.local                           ✅ (nouveau)
├── .env.example                         ✅ (nouveau)
├── package.json                         ✅ (mis à jour)
├── vercel.json                          ✅ (mis à jour)
├── next.config.mjs                      ✅ (mis à jour)
└── fortunow/                            ⚠️ À SUPPRIMER
```

---

## 🎯 Prochaines Étapes

1. **Supprimer le dossier `fortunow/`**:
   ```bash
   rm -rf fortunow/
   ```

2. **Configurer votre Base de Données**:
   - Créer une DB PostgreSQL (Supabase, Railway, etc.)
   - Obtenir la chaîne de connexion
   - Configurer dans Vercel Dashboard

3. **Tester Localement**:
   ```bash
   npm install
   npm run db:push
   npm run dev
   ```

4. **Déployer**:
   ```bash
   git add .
   git commit -m "Deploy: Fixed Prisma configuration"
   git push origin main
   ```

---

## ✅ Build Vercel Attendu

```
13:20:57.734 Detected Next.js version: 16.0.8
13:20:57.885 Running "npm run prebuild"
✓ Prisma client generated successfully
13:20:57.885 Running "npm run build"
✓ Compiled successfully
13:21:10.546 Running "npm run postbuild"
✓ Database synced
✓ Build completed successfully
```

**Vous êtes prêt! 🚀**
