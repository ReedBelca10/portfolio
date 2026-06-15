# Portfolio Professional

Bienvenue dans ce projet complet de portfolio professionnel avec **Next.js**, **Strapi** et **PostgreSQL**.

## Démarrage Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local

# 3. Démarrer la base de données
docker-compose up -d

# 4. Démarrer le CMS (terminal 1)
cd apps/cms && npm run develop

# 5. Démarrer le frontend (terminal 2)
npm run dev:frontend
```

Accès:
- Frontend: http://localhost:3000
- CMS Admin: http://localhost:1337/admin
- DB (Adminer): http://localhost:8080

## Documentation

- [Getting Started](docs/GETTING_STARTED.md) - Guide complet de démarrage
- [Architecture](docs/ARCHITECTURE.md) - Vue d'ensemble technique
- [Deployment](docs/DEPLOYMENT.md) - Guide de déploiement

## Structure

```
portfolio/
├── apps/
│   ├── frontend/   → Next.js Application
│   └── cms/        → Strapi Backend
├── packages/
│   ├── shared-types/  → Types TypeScript
│   ├── config/        → Configuration
│   └── utils/         → Utilitaires
├── messages/       → i18n (FR, EN)
└── docs/          → Documentation
```

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 18, Tailwind, TypeScript |
| CMS | Strapi 5 |
| Database | PostgreSQL (Neon) |
| Media | Cloudinary |
| i18n | next-intl |
| Package Manager | npm workspaces |

## Scripts Principaux

```bash
npm run dev              # Tout en développement
npm run dev:frontend   # Juste le frontend
npm run dev:cms        # Juste le CMS

npm run build          # Build complet
npm run build:frontend
npm run build:cms

npm run format         # Formater le code
npm run lint           # Lint tous les fichiers
npm run type-check     # Vérifier TypeScript
```

## Prochaines Étapes

1. **Personnaliser le design** - Modifier Tailwind config
2. **Ajouter du contenu** - Créer des projets dans Strapi
3. **Connecter Cloudinary** - Configurer les images
4. **Implémenter les pages** - Créer About, Projects, Contact
5. **Déployer** - Vercel (frontend), Railway/Render (backend)

## Ressources

- [Strapi Docs](https://docs.strapi.io)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [next-intl](https://next-intl-docs.vercel.app)

## Support

Consultez la documentation dans `/docs` ou contactez l'équipe dev.

---

**Version**: 1.0.0  
**License**: MIT
