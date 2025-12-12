# UTY Admin - Interface d'Administration

Une interface d'administration moderne et complète pour la plateforme UTY, construite avec Next.js 14, TypeScript, Redux Toolkit et Ant Design.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Rôles et Permissions](#rôles-et-permissions)
- [Démarrage](#démarrage)

## ✨ Fonctionnalités

### 📊 Dashboard
- Vue d'ensemble avec statistiques en temps réel
- Graphiques interactifs (revenus, ventes, activité)
- KPIs clés (utilisateurs, commandes, revenus)
- Widgets personnalisables

### 🗂️ Gestion des Catégories
- CRUD complet des catégories et sous-catégories
- Champs dynamiques (texte, liste, nombre, booléens, tags)
- Organisation par drag-and-drop
- Impact direct sur les formulaires vendeurs

### 📦 Gestion des Annonces
- Consultation et filtrage avancé
- Modération : approbation, blocage, suppression
- Historique complet
- Relance modération IA

### 👥 Gestion des Utilisateurs
- Profils clients, vendeurs, livreurs
- Suivi d'activité
- Restrictions et sanctions
- Validation KYC

### 🛒 Gestion des Commandes
- Vue générale et détaillée
- Suivi du statut
- Gestion des litiges
- Attribution des livreurs

### 🚚 Suivi des Livraisons
- Tracking en temps réel
- Affectation des livreurs
- Analyse de performances
- Carte interactive

### ⚖️ Gestion des Enchères
- Suivi temps réel
- Historique des mises
- Fermeture manuelle
- Détermination du gagnant

### 🤖 Modération IA
- Analyse automatique via AWS Rekognition
- Drapeaux automatiques
- Contrôle manuel
- Scoring de confiance IA

### 🔐 Sécurité
- Authentification JWT + Refresh Token
- 2FA recommandé
- Logs d'actions administrateur
- Permissions granulaires par rôle

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Drag & Drop**: react-beautiful-dnd
- **Date Formatting**: date-fns
- **HTTP Client**: Axios
- **WebSocket**: Socket.io Client

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/uty-admin.git
cd uty-admin

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer vos variables d'environnement
# Éditer .env.local avec vos valeurs
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# AWS Configuration
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your_bucket
```

### Configuration AWS Rekognition

Pour activer la modération IA :

1. Créer un compte AWS
2. Activer AWS Rekognition dans votre région
3. Créer une clé d'accès IAM avec permissions Rekognition
4. Ajouter les credentials dans `.env.local`

## 📁 Structure du projet

```
uty-admin/
├── app/
│   ├── components/
│   │   ├── common/          # Composants réutilisables
│   │   │   ├── StatCard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── DonutChart.tsx
│   │   └── layout/          # Composants de layout
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── DashboardLayout.tsx
│   ├── dashboard/           # Pages du dashboard
│   │   ├── page.tsx         # Dashboard principal
│   │   ├── users/           # Gestion utilisateurs
│   │   ├── categories/      # Gestion catégories
│   │   ├── listings/        # Gestion annonces
│   │   ├── orders/          # Gestion commandes
│   │   ├── deliveries/      # Suivi livraisons
│   │   ├── auctions/        # Gestion enchères
│   │   ├── moderation/      # Modération IA
│   │   └── settings/        # Paramètres
│   ├── login/
│   │   └── page.tsx         # Page de connexion
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   └── styles/
│       └── globals.css      # Styles globaux
├── lib/
│   ├── features/
│   │   └── auth/            # Slice Redux auth
│   ├── services/
│   │   └── api.ts           # RTK Query API
│   ├── types/
│   │   └── index.ts         # Types TypeScript
│   ├── hooks.ts             # Hooks Redux
│   └── store.ts             # Configuration Redux
├── public/                  # Assets statiques
├── .env.example            # Exemple de variables d'env
├── tailwind.config.js      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
├── next.config.mjs         # Configuration Next.js
└── package.json
```

## 👥 Rôles et Permissions

### Super Admin
- Accès total à toutes les fonctionnalités
- Gestion des paramètres critiques
- Gestion des rôles et permissions

### Admin
- Gestion complète sauf paramètres critiques
- Gestion utilisateurs, catégories, annonces
- Accès aux statistiques complètes

### Modérateur
- Gestion des annonces et contenus
- Modération IA
- Pas d'accès aux paramètres

### Support
- Gestion des litiges
- Support clients
- Vue limitée des commandes

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build production

```bash
npm run build
npm start
```

### Comptes de démonstration

Pour tester l'application :

- **Super Admin**: admin@uty.com / admin123
- **Modérateur**: moderator@uty.com / mod123

## 📝 Scripts disponibles

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build pour la production
npm start        # Démarrer en mode production
npm run lint     # Linter le code
```

## 🎨 Personnalisation

### Couleurs et thème

Modifiez `tailwind.config.js` pour personnaliser les couleurs :

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      }
    }
  }
}
```

### Composants Ant Design

Personnalisez le thème Ant Design dans `app/layout.tsx` avec ConfigProvider.

## 🔒 Sécurité

- Authentification JWT avec refresh tokens
- Cookies HttpOnly pour les tokens
- Protection CSRF
- Rate limiting (configuré côté API)
- Validation des entrées
- Logs d'audit complets

## 📊 Intégrations

### AWS Rekognition
Détection automatique de :
- Contenu inapproprié
- Texte dans les images
- Objets interdits
- Visages et âge

### WebSockets
- Notifications en temps réel
- Suivi des enchères en direct
- Tracking des livraisons
- Mises à jour des commandes

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez suivre ces étapes :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📧 Contact

Pour toute question ou suggestion :
- Email: contact@uty.com
- GitHub: [@uty-admin](https://github.com/uty-admin)

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [Ant Design](https://ant.design/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)

---

Développé avec ❤️ pour la plateforme UTY
