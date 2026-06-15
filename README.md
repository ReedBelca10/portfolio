# Portfolio Professional - Full Stack Project

Une application portfolio complète avec une architecture moderne, scalable et prête pour la production.

## 🚀 Stack Technologique

### Frontend
- **Framework**: Next.js 15+ avec App Router
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl (FR, EN)
- **Image Optimization**: Cloudinary & next-cloudinary
- **HTTP Client**: Axios

### Backend/CMS
- **CMS**: Strapi v5
- **Base de données**: PostgreSQL (Neon pour production)
- **API**: REST API avec GraphQL (optionnel)

### Infrastructure
- **Conteneurisation**: Docker & Docker Compose
- **Package Manager**: npm workspaces (monorepo)
- **TypeScript**: Support complet avec types partagés

## 📁 Structure du Projet

```
portfolio/
├── apps/
│   ├── frontend/              # Application Next.js
│   │   ├── src/
│   │   │   ├── app/          # App Router
│   │   │   ├── components/   # Composants réutilisables
│   │   │   ├── lib/          # Utilitaires (API, Cloudinary)
│   │   │   └── i18n/         # Configuration i18n
│   │   └── public/           # Assets statiques
│   └── cms/                  # Strapi CMS
│       ├── config/           # Configuration globale
│       ├── src/
│       │   └── api/          # Content types schemas
│       └── public/           # Uploads Strapi
├── packages/
│   ├── shared-types/         # Types TypeScript partagés
│   ├── config/              # Configurations centralisées
│   └── utils/               # Fonctions utilitaires partagées
├── messages/                # Fichiers de traduction i18n
├── docs/                    # Documentation du projet
├── docker-compose.yml       # Services locaux
├── .env.example             # Exemple d'environnement
└── package.json             # Root workspace configuration
```

## ⚙️ Configuration Initiale

### 1. Pré-requis
- Node.js >= 18.17.0
- npm >= 9.0.0
- Docker & Docker Compose (pour développement local)
- Git

### 2. Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd portfolio

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local
```

### 3. Configuration de l'Environnement

Éditer `.env.local`:

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Backend
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=portfolio_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

ADMIN_JWT_SECRET=your_secret_key_change_in_production

# Cloudinary
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Démarrer PostgreSQL (local)

```bash
# Démarrer Docker Compose
docker-compose up -d

# Vérifier l'état
docker-compose ps

# Accéder à Adminer (gestion DB)
# http://localhost:8080
```

### 5. Initialiser le CMS Strapi

```bash
# Aller dans le dossier CMS
cd apps/cms

# Installer Strapi
npm install

# Démarrer Strapi en développement
npm run develop

# Accéder à http://localhost:1337/admin
```

### 6. Démarrer le Frontend Next.js

```bash
# Dans un autre terminal, aller à la racine
cd portfolio

# Démarrer le frontend
npm run dev:frontend

# Accéder à http://localhost:3000
```

## 📊 Schémas de Données Strapi

### Portfolio Info
- Information générale du propriétaire
- Photo de profil
- CV/Resume
- Liens sociaux

### Projects
- Titre, description, contenu détaillé
- Images (Cloudinary)
- Technologies utilisées
- Lien live et GitHub
- Mis en avant (featured)

### Skills/Compétences
- Nom et catégorie (programmation, design, outils, soft skills)
- Niveau (débutant à expert)
- Années d'expérience
- Icône

### Services/Offres
- Titre et description
- Durée et prix
- Livrables
- Contenu détaillé

### Messages/Contact
- Nom, email, sujet
- Message
- Pièces jointes optionnelles
- Statut (lu/non lu)

### Testimonials
- Auteur, rôle, entreprise
- Photo
- Évaluation (1-5)
- Contenu

## 🌍 Internationalisation (i18n)

Le projet supporte FR et EN. Les traductions sont dans `/messages`:
- `en.json` - Anglais
- `fr.json` - Français

Pour ajouter une nouvelle langue:
1. Créer `messages/{locale}.json`
2. Ajouter le locale dans `apps/frontend/src/i18n.ts`
3. Ajouter les textes traduits

## 🖼️ Intégration Cloudinary

Pour les images optimisées:
1. Créer un compte Cloudinary
2. Copier votre Cloud Name
3. Configurer `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
4. Utiliser le composant `CldImage` pour les images optimisées

```typescript
import { CldImage } from 'next-cloudinary';

<CldImage
  src="your-public-id"
  alt="Description"
  width={400}
  height={300}
/>
```

## 🚢 Production

### Base de données Neon PostgreSQL
1. Créer un compte Neon (https://neon.tech)
2. Créer une base de données
3. Copier la connection string
4. Configurer `DATABASE_URL_PRODUCTION`

### Déploiement Frontend (Vercel)
```bash
# Vercel déploie automatiquement depuis GitHub
# Variables d'environnement à configurer:
# - NEXT_PUBLIC_API_URL
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```

### Déploiement Backend (Heroku/Render/Railway)
```bash
# Voir documentation Strapi pour votre plateforme
# Assurez-vous de configurer:
# - DATABASE_URL
# - ADMIN_JWT_SECRET
# - APP_KEYS
```

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev              # Démarrer tout en dev
npm run dev:frontend    # Juste le frontend
npm run dev:cms         # Juste le CMS

# Build
npm run build           # Build tout
npm run build:frontend  # Build frontend
npm run build:cms       # Build CMS

# Linting & Formatting
npm run lint            # Lint tous les workspaces
npm run format          # Formater le code
npm run format:check    # Vérifier le formatage

# Type checking
npm run type-check      # Vérifier les types TypeScript

# Nettoyage
npm run clean           # Nettoyer les builds et dépendances
```

## 📚 Ressources Documentaires

### Strapi
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Content Types](https://docs.strapi.io/user-docs/content-manager)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### next-intl
- [next-intl Documentation](https://next-intl-docs.vercel.app)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)

## 🔒 Sécurité

- Utiliser des variables d'environnement pour les secrets
- Configurer CORS dans Strapi
- Valider les données côté serveur
- Utiliser des API tokens pour Strapi
- Activer HTTPS en production

## 📈 Scalabilité & Évolution

### Points clés d'extensibilité
1. **Types partagés**: Package `shared-types` pour cohérence
2. **API modulaire**: Strapi permet l'ajout facile de content types
3. **Composants réutilisables**: Structure composant.tsx
4. **i18n flexible**: Ajouter facilement de nouvelles langues
5. **Cloudinary**: Gestion centralisée des médias

### Prochaines étapes envisageables
- [ ] Ajouter des commentaires/ratings aux projets
- [ ] Système de blog complète
- [ ] Newsletter/Abonnement
- [ ] Moteur de recherche
- [ ] Analytics avancées
- [ ] API GraphQL côté frontend
- [ ] Webhooks pour automatisation
- [ ] Système de cache (Redis)
- [ ] CDN global

## 🤝 Contribution

1. Créer une branche pour votre feature
2. Commit avec messages clairs
3. Faire un pull request
4. Assurer que les tests passent

## 📝 License

MIT

---

**Besoin d'aide?** Consultez la documentation dans le dossier `/docs`
