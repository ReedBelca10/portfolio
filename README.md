# Caleb Adjeoda Portfolio

This repository contains the source code for Caleb Adjeoda's professional portfolio, built with a modern tech stack.

## Architecture

The project is structured as a monorepo containing two main applications:

- **Frontend (`apps/frontend`)**: A Next.js 15 application utilizing the App Router, styled with Tailwind CSS and Framer Motion for smooth animations.
- **Backend (`apps/cms`)**: A Strapi v4 headless CMS that manages the content for the portfolio, including Projects, Blogs, Skills, Works, and Contact Messages.

## Deployment Configurations

### Frontend (Vercel)
- Frontend URL: `https://calebadjeoda.dev`
- Production URL: `https://calebadjeoda.dev`
Required Environment Variables:
- `NEXT_PUBLIC_API_URL`: `https://api.calebadjeoda.dev`

### Backend (Render)
- Backend URL: `https://api.calebadjeoda.dev`
- Production URL: `https://api.calebadjeoda.dev`
Required Environment Variables:
- `DATABASE_URL`: Your production PostgreSQL connection string
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`: For media uploads
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`: For email forwarding via contact form
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`: Standard Strapi security keys

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Backend CMS:
   ```bash
   npm run dev:cms
   ```

3. Start the Frontend Application:
   ```bash
   npm run dev:frontend
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:1337`.
