#!/bin/bash

# ==========================================
# Portfolio Project - Setup Script
# ==========================================

set -e

echo "Portfolio Project Setup"
echo "========================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Please install Node.js >= 18.17.0"
    exit 1
fi

echo "Node.js $(node --version) found"
echo "npm $(npm --version) found"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo "Dependencies installed"
echo ""

# Check Docker
if command -v docker &> /dev/null; then
    echo "Docker found"
    echo "Starting PostgreSQL..."
    docker-compose up -d
    echo "PostgreSQL started (http://localhost:8080)"
else
    echo "Docker not found. You need to start PostgreSQL manually"
fi
echo ""

# Create .env.local if not exists
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local..."
    cp .env.example .env.local
    echo ".env.local created - please edit with your credentials"
else
    echo ".env.local already exists"
fi
echo ""

# Display next steps
echo "Setup completed!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your configuration"
echo "2. Start Strapi: cd apps/cms && npm run develop"
echo "3. Start Frontend: npm run dev:frontend"
echo "4. Open http://localhost:3000"
echo ""
echo "Documentation:"
echo "- Getting Started: docs/GETTING_STARTED.md"
echo "- Architecture: docs/ARCHITECTURE.md"
echo "- Deployment: docs/DEPLOYMENT.md"
echo ""
