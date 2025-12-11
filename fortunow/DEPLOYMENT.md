# FortuNow - Application de Prédiction

Une plateforme moderne de prédiction où les utilisateurs peuvent parier sur les événements futurs et constituer un portefeuille.

## 🚀 Fonctionnalités

### Tier 1 ✅
- 🔐 Authentification NextAuth (inscription/connexion)
- 💾 Base de données Prisma + SQLite
- 📊 Dashboard avec statistiques
- 🔍 Recherche et filtrage avancés
- 📈 Graphiques de performance

### Tier 2 ✅
- ⭐ Système de favoris
- 🏆 Leaderboard global
- 📊 Statistiques détaillées des positions
- 🔔 Système de notifications
- 🎨 Design UI/UX professionnel

## 💻 Stack technique

- **Frontend** : Next.js 16, React 19, Tailwind CSS, Recharts
- **Backend** : Next.js API Routes
- **Database** : Prisma + SQLite
- **Auth** : NextAuth.js 4
- **UI Components** : Lucide React

## 📦 Installation locale

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/Ogust11/FortuNow.git
cd FortuNow/fortunow

# 2. Installer les dépendances
npm install

# 3. Créer la base de données
npm run migrate

# 4. Lancer l'app
npm run dev
```

L'app sera accessible à `http://localhost:3000`

## 🚀 Déploiement sur Vercel

### Configuration initiale

1. **Pousser le code sur GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connecter le repo à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "New Project"
   - Sélectionner ton repo GitHub
   - Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
   Dans Vercel, aller à Project Settings → Environment Variables

   Ajouter :
   ```
   DATABASE_URL=file:./prisma/dev.db
   NEXTAUTH_SECRET=<generate-a-secure-random-key>
   NEXTAUTH_URL=https://<your-deployment>.vercel.app
   ```

   Pour générer un secret secure :
   ```bash
   openssl rand -base64 32
   ```

4. **Déployer**
   - Cliquer "Deploy"
   - Vercel exécutera `npm run build` qui inclut la migration Prisma
   - C'est bon! 🎉

### Variables d'environnement requises

| Variable | Exemple | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `file:./prisma/dev.db` | Chemin de la base de données |
| `NEXTAUTH_SECRET` | `K7x9mP2qL5nR8vT1hB4jD6gF3wS0zC8eY9uX2qW5pM8nV1lK7sH4bJ6tD3fR9vG2` | Clé secrète pour les sessions |
| `NEXTAUTH_URL` | `https://fortunow.vercel.app` | URL publique de l'app |

## 🧪 Tests en local

```bash
# Lancer le serveur dev
npm run dev

# Créer un compte de test
# Email: test@example.com
# Password: password123

# Accéder aux pages
# - Dashboard: http://localhost:3000/dashboard
# - Marchés: http://localhost:3000/markets
# - Leaderboard: http://localhost:3000/leaderboard
```

## 📁 Structure du projet

```
fortunow/
├── app/
│   ├── api/              # API Routes
│   ├── auth/             # Pages d'authentification
│   ├── dashboard/        # Dashboard utilisateur
│   ├── markets/          # Page des marchés
│   ├── leaderboard/      # Page du classement
│   └── page.js           # Landing page
├── components/           # Composants réutilisables
├── lib/                  # Utilitaires
├── prisma/
│   └── schema.prisma    # Schéma de la BD
└── public/              # Assets statiques
```

## 🛠️ Commandes

```bash
npm run dev       # Lancer le serveur de développement
npm run build     # Construire pour la production
npm run start     # Lancer le serveur de production
npm run migrate   # Exécuter les migrations Prisma
npm run lint      # Vérifier le code
```

## 📝 Variables d'environnement (.env.local)

```
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🤝 Support

Pour toute question ou bug, créer une issue sur GitHub.

## 📄 License

MIT

---

**Créé avec ❤️ en 2024**
