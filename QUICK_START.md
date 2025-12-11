# QUICK START - ACTIONS RAPIDES

## 🎯 À FAIRE EN 15 MIN

### 1️⃣ Configurer BD sur Vercel (5 min)
```
https://vercel.com/dashboard
→ FortuNow
→ Settings
→ Environment Variables
→ Ajouter:
   DATABASE_URL = [PostgreSQL - Supabase/Railway/Neon]
   NEXTAUTH_SECRET = openssl rand -base64 32
   NEXTAUTH_URL = https://fortunow.vercel.app
```

### 2️⃣ Exécuter Script Auto (5 min)
```bash
cd /workspaces/FortuNow
bash setup-vercel.sh
```

### 3️⃣ Vérifier Deployment (3 min)
```
https://vercel.com/dashboard
→ FortuNow
→ Attendez "Ready" (vert)
→ Cliquez l'URL
→ Testez!
```

---

## 📊 STATUS

- ✅ Code corrigé
- ⏳ ATTENTE: Vous configuriez Vercel + exécutiez le script

---

**C'est tout! 🚀**
