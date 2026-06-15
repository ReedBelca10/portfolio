# Architecture du Projet

## Vue d'ensemble

Le projet utilise une **architecture monorepo** avec une séparation claire entre:
- **Frontend**: Application Next.js (client)
- **Backend**: CMS Strapi (serveur)
- **Packages partagés**: Types, configurations, utilitaires

## Flux de données

```
Utilisateur (Browser)
    ↓
Next.js (Frontend) ← Fichiers de traduction i18n
    ↓
Cloudinary ← Images optimisées
    ↓
Strapi API (http://localhost:1337/api)
    ↓
PostgreSQL / Neon
```

## Communication Frontend ↔ Backend

### API Strapi
Le frontend communique avec Strapi via REST API:

```typescript
// apps/frontend/src/lib/strapi.ts
GET  /api/projects?populate=*&sort=createdAt:desc
GET  /api/skills?sort=category
POST /api/messages
GET  /api/portfolio-info?populate=*
```

### Gestion des images
- Stockage: Cloudinary (production)
- Optimisation: next-cloudinary, next/image
- Fallback: Strapi media library (développement)

## Structure des Packages

### 1. `shared-types`
Types TypeScript centralisés utilisés par frontend et backend:
```typescript
- Portfolio
- Project
- Skill
- Message
- Testimonial
- Service
```

### 2. `config`
Configuration centralisée:
```typescript
- API endpoints
- Constantes d'application
- Configuration Cloudinary
```

### 3. `utils`
Fonctions utilitaires partagées:
```typescript
- Formatage des dates
- Validation des formulaires
- Utilitaires de texte
```

## Internationalization (i18n)

### Structure
```
messages/
├── en.json    # Traductions anglaises
└── fr.json    # Traductions françaises
```

### Utilisation
```typescript
// Dans les Server Components
import { getTranslations } from 'next-intl/server';

const t = getTranslations('home');
console.log(t('title'));

// Dans les Client Components
'use client';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('common');
  return <h1>{t('nav.home')}</h1>;
}
```

## Scalabilité

### Ajout d'une nouvelle feature
1. Ajouter le content type dans Strapi
2. Créer les types TypeScript dans `shared-types`
3. Créer la fonction API dans `apps/frontend/src/lib/strapi.ts`
4. Créer les composants React
5. Ajouter les traductions i18n

### Exemple: Ajouter une section Blog

**1. Strapi** - Créer content type Blog
```json
{
  "title": "string",
  "slug": "uid",
  "content": "richtext",
  "author": "string",
  "tags": ["tags"],
  "publishedAt": "datetime"
}
```

**2. Types** - Ajouter dans `shared-types`
```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
}
```

**3. Frontend** - Créer API helper
```typescript
export async function fetchBlogPosts() {
  return strapiClient.get<StrapiResponse<any>>(
    '/blog-posts?sort=publishedAt:desc'
  );
}
```

**4. Components** - Créer composants React
```typescript
export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    fetchBlogPosts().then(data => setPosts(data));
  }, []);
  
  return (...);
}
```

**5. i18n** - Ajouter traductions
```json
// messages/en.json
{
  "blog": {
    "title": "Blog",
    "readMore": "Read More"
  }
}

// messages/fr.json
{
  "blog": {
    "title": "Blog",
    "readMore": "Lire la suite"
  }
}
```

## Performance

### Optimisations mises en place
- **Next.js Image Optimization**: Images automatiquement optimisées
- **Cloudinary**: CDN global pour les assets
- **Code Splitting**: App Router permet le lazy loading
- **ISR**: Incremental Static Regeneration pour les pages statiques
- **Compression**: Gzip/Brotli automatique

### Recommandations futures
- Ajouter Redis pour le caching côté API
- Mettre en cache les réponses Strapi
- Service Worker pour offline support
- Preload des ressources critiques

## Sécurité

### Mesures en place
- **Validations**: Données validées côté serveur
- **CORS**: Configuré dans Strapi
- **Secrets**: Variables d'environnement
- **JWT**: Authentification Strapi sécurisée
- **HTTPS**: Force en production

### À implémenter
- Rate limiting sur les API
- CSRF protection
- Content Security Policy
- Audit des dépendances régulier

## Déploiement

### Local Development
```bash
docker-compose up -d  # PostgreSQL
npm run dev:cms      # Strapi
npm run dev:frontend # Next.js
```

### Staging/Production

**Frontend (Vercel)**
```bash
vercel deploy --prod
# Env vars: NEXT_PUBLIC_API_URL, CLOUDINARY_CLOUD_NAME
```

**Backend (Render/Railway/Heroku)**
```bash
# Variables requises:
# - DATABASE_URL (Neon)
# - ADMIN_JWT_SECRET
# - APP_KEYS
# - NODE_ENV=production
```

**Database (Neon)**
- Créer un project Neon
- Configurer les backups automatiques
- Monitoring des performances

## Monitoring & Logs

### Frontend
- Sentry pour error tracking
- Google Analytics
- Logs côté client dans DevTools

### Backend
- Logs Strapi (voir .cache/logs)
- Monitoring base de données Neon
- Health checks réguliers

## Version Control

### Branching Strategy
```
main (production ready)
├── staging (pre-production)
└── develop (development)
    ├── feature/blog-section
    ├── feature/dark-mode
    └── fix/contact-form
```

### Commits
```
feat: Add blog section to portfolio
fix: Resolve image loading issue
docs: Update README
style: Format code with Prettier
test: Add tests for contact form
chore: Update dependencies
```

---

**Document mis à jour**: 2024-12-15
**Mainteneur**: Équipe dev portfolio
