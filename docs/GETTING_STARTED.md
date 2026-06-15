# Guide de Démarrage Rapide

## Installation (5 minutes)

### 1. Cloner et installer
```bash
git clone <votre-repo> && cd portfolio
npm install
```

### 2. Configuration environnement
```bash
cp .env.example .env.local
# Éditer .env.local avec vos credentials
```

### 3. Démarrer la base de données
```bash
docker-compose up -d
# Accès DB: http://localhost:8080 (Adminer)
```

### 4. Initialiser et démarrer Strapi
```bash
cd apps/cms
npm install
npm run develop
# Accès: http://localhost:1337/admin
```

### 5. Démarrer le frontend
```bash
# Depuis la racine du projet
npm run dev:frontend
# Accès: http://localhost:3000
```

## ✅ Checklist de configuration

- [ ] Node.js >= 18.17 installé (`node --version`)
- [ ] npm >= 9 installé (`npm --version`)
- [ ] Docker Desktop running (si utilisant DB local)
- [ ] `.env.local` créé et configuré
- [ ] `docker-compose up -d` exécuté
- [ ] Strapi démarré (`npm run develop` in apps/cms)
- [ ] Frontend démarré (`npm run dev:frontend`)
- [ ] Accès http://localhost:3000 ✓

## Premiers pas dans Strapi

### 1. Créer un compte admin
- Accéder http://localhost:1337/admin
- Créer utilisateur admin
- Définir mot de passe

### 2. Ajouter une Portfolio Info
1. Aller dans Content Manager → Portfolio Info
2. Créer une nouvelle entrée
3. Remplir: nom, titre, email
4. Publier

### 3. Ajouter un premier projet
1. Aller dans Content Manager → Projects
2. Créer un nouveau projet
3. Remplir les champs (titre, description, images)
4. Publier

### 4. Configurer les API tokens
1. Aller dans Settings → API Tokens
2. Créer un token pour le frontend
3. Copier le token
4. L'utiliser pour les appels authentifiés

## Premiers pas dans le Frontend

### 1. Vérifier la connexion API
```typescript
// apps/frontend/src/lib/strapi.ts
// Modifier fetchPortfolioInfo() pour tester
```

### 2. Ajouter des traductions
```json
// messages/en.json et fr.json
{
  "yourSection": {
    "title": "Title",
    "description": "Description"
  }
}
```

### 3. Créer un composant
```typescript
// apps/frontend/src/components/YourComponent.tsx
export function YourComponent() {
  return <div>Votre contenu</div>;
}
```

## Commandes utiles

```bash
# Démarrer tout
npm run dev

# Démarrer juste frontend
npm run dev:frontend

# Démarrer juste CMS
npm run dev:cms

# Build
npm run build

# Formater code
npm run format

# Type checking
npm run type-check

# Arrêter la DB
docker-compose down
```

## Troubleshooting

### Erreur: "Cannot connect to database"
```bash
# Vérifier que Docker est lancé
docker-compose ps

# Relancer les services
docker-compose down && docker-compose up -d
```

### Erreur: "API not responding"
```bash
# Vérifier que Strapi est démarré
# http://localhost:1337/api/projects

# Vérifier les logs Strapi
cd apps/cms && npm run develop
```

### Erreur: "Port already in use"
```bash
# Changer les ports dans .env.local ou docker-compose.yml
# Ports défauts: 3000 (frontend), 1337 (Strapi), 5432 (DB)
```

### Erreur de TypeScript
```bash
# Régénérer les types
cd apps/cms && npm run build

# Type check
npm run type-check
```

## Prochaines étapes

1. ✅ Personnaliser le design Tailwind
2. ✅ Ajouter plus de contenu dans Strapi
3. ✅ Implémenter les pages manquantes
4. ✅ Connecter Cloudinary
5. ✅ Tester le contact form
6. ✅ Configurer les env variables production
7. ✅ Déployer sur Vercel (frontend)
8. ✅ Déployer sur Railway/Render (backend)

## Support

Consultez la documentation complète:
- Architecture: `docs/ARCHITECTURE.md`
- Strapi: https://docs.strapi.io
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
