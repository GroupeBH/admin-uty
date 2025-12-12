# Guide de Déploiement - UTY Admin

## 📋 Prérequis

- Node.js 18+ installé
- npm ou yarn
- Un serveur backend API en cours d'exécution
- Compte AWS (pour Rekognition)
- Compte Vercel/Netlify/autre hébergeur (optionnel)

## 🛠️ Préparation

### 1. Variables d'environnement

Créer un fichier `.env.production` :

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com/api
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com

# AWS Configuration
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=VOTRE_CLE_AWS
AWS_SECRET_ACCESS_KEY=VOTRE_SECRET_AWS
AWS_S3_BUCKET=votre-bucket-production

# JWT Configuration
JWT_SECRET=votre_jwt_secret_tres_securise
JWT_REFRESH_SECRET=votre_refresh_secret_tres_securise

# Environment
NODE_ENV=production
```

### 2. Installation des dépendances

```bash
npm install --production
```

### 3. Build de l'application

```bash
npm run build
```

Cela génère un dossier `.next` avec l'application optimisée.

## 🚀 Déploiement

### Option 1: Vercel (Recommandé)

Vercel est créé par l'équipe Next.js et offre la meilleure intégration.

#### Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

#### Via GitHub

1. Pousser votre code sur GitHub
2. Connecter votre repo à Vercel
3. Configurer les variables d'environnement
4. Déployer automatiquement

#### Configuration Vercel

Dans `vercel.json` :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url",
    "NEXT_PUBLIC_WS_URL": "@ws-url"
  }
}
```

### Option 2: Netlify

```bash
# Installer Netlify CLI
npm install netlify-cli -g

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

Configuration dans `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Docker

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy necessary files
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  uty-admin:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://api.votre-domaine.com/api
      - NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
      - NODE_ENV=production
    restart: unless-stopped
```

#### Déploiement

```bash
# Build l'image
docker build -t uty-admin .

# Run le container
docker run -p 3000:3000 --env-file .env.production uty-admin

# Ou avec docker-compose
docker-compose up -d
```

### Option 4: Serveur VPS (Ubuntu)

#### 1. Installation Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. Installation PM2

```bash
sudo npm install -g pm2
```

#### 3. Déploiement

```bash
# Cloner le repo
git clone https://github.com/votre-org/uty-admin.git
cd uty-admin

# Installer les dépendances
npm install

# Build
npm run build

# Démarrer avec PM2
pm2 start npm --name "uty-admin" -- start

# Sauvegarder la config PM2
pm2 save
pm2 startup
```

#### 4. Configuration Nginx

```nginx
server {
    listen 80;
    server_name admin.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 5. SSL avec Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d admin.votre-domaine.com
```

## 🔧 Configuration Post-Déploiement

### 1. Variables d'environnement

Assurez-vous que toutes les variables sont correctement configurées :

- ✅ `NEXT_PUBLIC_API_URL` pointe vers votre API backend
- ✅ `NEXT_PUBLIC_WS_URL` pour les WebSockets
- ✅ AWS credentials configurés
- ✅ JWT secrets sécurisés et différents de dev

### 2. Configuration AWS

#### IAM Policy pour Rekognition

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rekognition:DetectModerationLabels",
        "rekognition:DetectText",
        "rekognition:DetectLabels"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::votre-bucket/*"
    }
  ]
}
```

### 3. Configuration CORS

Dans votre backend API, configurer CORS :

```javascript
const corsOptions = {
  origin: ['https://admin.votre-domaine.com'],
  credentials: true,
};
```

### 4. Monitoring

#### Vercel Analytics

Activer dans le dashboard Vercel.

#### PM2 Monitoring

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

#### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs
```

```javascript
// next.config.mjs
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // ... votre config
};

export default withSentryConfig(nextConfig, {
  org: "votre-org",
  project: "uty-admin",
});
```

## 🔒 Sécurité Production

### 1. Headers de sécurité

Dans `next.config.mjs` :

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. Rate Limiting

Utiliser un middleware ou Cloudflare pour le rate limiting.

### 3. Secrets

- ⚠️ Ne jamais commit les fichiers `.env`
- ✅ Utiliser des secrets management (Vercel Secrets, AWS Secrets Manager)
- ✅ Rotation régulière des tokens JWT
- ✅ Utiliser des clés API différentes par environnement

## 📊 Performance

### 1. Optimisations Build

```javascript
// next.config.mjs
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['votre-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
};
```

### 2. CDN pour Assets

Utiliser un CDN pour les images et fichiers statiques :

- Cloudflare
- AWS CloudFront
- Vercel Edge Network (automatique)

### 3. Caching

```javascript
// API routes
export const revalidate = 60; // Revalidate every 60 seconds
```

## 🔄 CI/CD

### GitHub Actions

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🧪 Vérification Post-Déploiement

### Checklist

- [ ] L'application se charge correctement
- [ ] La connexion fonctionne
- [ ] Les API calls fonctionnent
- [ ] Les WebSockets se connectent
- [ ] Les images se chargent
- [ ] Le responsive fonctionne
- [ ] Les analytics sont configurés
- [ ] Les erreurs sont trackées
- [ ] SSL est actif
- [ ] Les redirections fonctionnent
- [ ] Performance > 90 sur Lighthouse

### Tests

```bash
# Test de l'endpoint API
curl https://admin.votre-domaine.com/api/health

# Test WebSocket
wscat -c wss://api.votre-domaine.com

# Lighthouse audit
lighthouse https://admin.votre-domaine.com --view
```

## 📞 Support

En cas de problème :

1. Vérifier les logs : `pm2 logs` ou dashboard Vercel
2. Vérifier la console navigateur
3. Tester les endpoints API
4. Consulter la documentation Next.js

## 🔄 Mises à jour

```bash
# Pull les derniers changements
git pull origin main

# Installer nouvelles dépendances
npm install

# Rebuild
npm run build

# Redémarrer
pm2 restart uty-admin

# Ou redéployer sur Vercel
vercel --prod
```

---

**Dernière mise à jour**: Décembre 2025

