# UTY Admin - Fonctionnalités Détaillées

## 📊 Dashboard Principal

### Vue d'ensemble
- **Statistiques clés en temps réel**
  - Total des utilisateurs avec croissance mensuelle
  - Nombre total d'annonces approuvées
  - Volume de commandes du mois
  - Revenu total avec évolution

- **Graphiques interactifs**
  - Graphique de revenus (This Week vs Last Week)
  - Graphique en donut pour les ventes par catégorie
  - Barres de progression pour les sources de trafic
  - Visualisations avec Recharts

- **Widgets secondaires**
  - Livraisons actives en cours
  - Enchères en cours
  - Modérations en attente

## 👥 Gestion des Utilisateurs

### Fonctionnalités principales
- **Consultation**
  - Liste complète avec pagination
  - Filtrage par rôle (Vendeur, Client, Livreur, Admin)
  - Filtrage par statut (Actif, Suspendu, Banni)
  - Recherche par nom ou email

- **Actions**
  - Modifier le statut (Actif/Suspendu/Banni)
  - Voir les détails du profil
  - Supprimer un utilisateur
  - Validation KYC (En attente/Approuvé/Rejeté)

- **Informations affichées**
  - Avatar et nom complet
  - Email et téléphone
  - Rôle avec badge coloré
  - Date d'inscription
  - Statut KYC

## 🗂️ Gestion des Catégories

### Organisation
- **Structure hiérarchique**
  - Catégories principales
  - Sous-catégories illimitées
  - Organisation par drag-and-drop (à implémenter)

- **Champs dynamiques**
  - Types supportés :
    - Texte (input simple)
    - Nombre (input numérique)
    - Liste déroulante (select)
    - Booléen (switch)
    - Tags (multi-select)
  - Configuration de champs obligatoires
  - Ordre personnalisable

- **Interface**
  - Vue en grille avec cartes
  - Statut actif/inactif
  - Compteur de champs dynamiques
  - Édition modale
  - Suppression avec confirmation

## 📦 Gestion des Annonces

### Modération
- **Filtres avancés**
  - Par statut (En attente/Approuvé/Rejeté/Vendu)
  - Par catégorie
  - Par recherche textuelle
  - Par date

- **Actions de modération**
  - Approuver une annonce
  - Rejeter avec raison
  - Supprimer définitivement
  - Voir les détails complets

- **Statistiques en temps réel**
  - Annonces en attente (badge orange)
  - Approuvées (badge vert)
  - Rejetées (badge rouge)
  - Vendues (badge violet)

- **Informations affichées**
  - Image principale
  - Titre et description
  - Catégorie
  - Type (Vente/Enchère)
  - Prix
  - Vendeur
  - Nombre de vues
  - Date de création

## 🛒 Gestion des Commandes

### Suivi
- **Statuts des commandes**
  - En attente (PENDING)
  - Confirmée (CONFIRMED)
  - En transit (IN_TRANSIT)
  - Livrée (DELIVERED)
  - Annulée (CANCELLED)
  - Litige (DISPUTED)

- **Vue détaillée**
  - Numéro de commande unique
  - Informations client et vendeur
  - Articles commandés avec quantités
  - Adresse de livraison complète
  - Montant total
  - Historique du statut

- **Gestion des litiges**
  - Signalement automatique
  - Interface de résolution
  - Communication client-vendeur
  - Décision finale par admin

- **Statistiques**
  - Compteurs par statut
  - Filtrage rapide
  - Export de données (à implémenter)

## 🚚 Suivi des Livraisons

### Tracking
- **Statuts de livraison**
  - Assignée (livreur attribué)
  - Récupérée (prise en charge)
  - En transit (en cours de livraison)
  - Livrée (complétée)
  - Échouée (problème)

- **Informations livreur**
  - Nom complet
  - Photo de profil
  - Téléphone
  - Historique de performances

- **Localisation**
  - Position GPS en temps réel (à implémenter)
  - Carte interactive (à implémenter)
  - Estimation du temps d'arrivée

- **Attribution**
  - Assignation manuelle
  - Réassignation en cas de problème
  - Notification push au livreur

## ⚖️ Gestion des Enchères

### Suivi temps réel
- **Informations d'enchère**
  - Prix de départ
  - Prix actuel (le plus haut)
  - Nombre d'enchères
  - Temps restant avec barre de progression
  - Statut (Active/Terminée/Annulée)

- **Historique des mises**
  - Liste complète ordonnée
  - Utilisateur enchérisseur
  - Montant de l'enchère
  - Date et heure
  - Mise gagnante marquée

- **Actions admin**
  - Fermer manuellement une enchère
  - Annuler une enchère
  - Voir les détails de l'article
  - Déterminer le gagnant

- **Notifications**
  - Nouvelle enchère
  - Fin d'enchère
  - Enchère gagnée

## 🤖 Modération IA

### AWS Rekognition
- **Détection automatique**
  - Contenu inapproprié (nudité, violence)
  - Texte dans les images
  - Objets interdits
  - Visages et estimation d'âge
  - Labels et scènes

- **Scoring de confiance**
  - Pourcentage de certitude IA
  - Barre visuelle de confiance
  - Seuils configurables
  - Classification par sévérité

### Drapeaux de modération
- **Types de signalement**
  - Automatique (IA)
  - Manuel (utilisateurs)

- **Niveaux de sévérité**
  - Faible (LOW) - badge vert
  - Moyen (MEDIUM) - badge orange
  - Élevé (HIGH) - badge rouge

- **Actions de résolution**
  - Approuver le contenu
  - Rejeter et supprimer
  - Demander modification
  - Historique des décisions

- **Dashboard modération**
  - Signalements en attente
  - Haute sévérité prioritaire
  - Détections IA automatiques
  - Résolutions effectuées

## ⚙️ Paramètres

### Général
- **Configuration du site**
  - Nom de la plateforme
  - Description
  - Email de contact
  - Fuseau horaire
  - Langue par défaut

### Sécurité
- **Authentification**
  - Activation 2FA
  - Timeout de session
  - Politique de mot de passe
  - Logs d'audit
  - Restrictions par IP (à implémenter)

- **Permissions**
  - Gestion par rôle
  - Attribution granulaire
  - Création de rôles personnalisés (à implémenter)

### Notifications
- **Préférences**
  - Nouvelles commandes
  - Contenus à modérer
  - Nouveaux utilisateurs
  - Litiges
  - Rapports hebdomadaires

- **Canaux**
  - Email
  - Push notifications
  - SMS (à implémenter)
  - WebSocket en temps réel

### Intégrations
- **AWS Services**
  - Configuration Rekognition
  - Bucket S3
  - Région AWS
  - Clés d'accès

- **Paiements**
  - Configuration Stripe
  - Configuration PayPal
  - Webhooks
  - Commissions

## 🔐 Sécurité et Permissions

### Authentification
- **JWT avec Refresh Tokens**
  - Access token (15 min)
  - Refresh token (7 jours)
  - HttpOnly cookies
  - Rotation automatique

- **2FA (à implémenter)**
  - TOTP (Google Authenticator)
  - SMS (Twilio)
  - Email de secours

### Rôles et Permissions

#### Super Admin
- ✅ Accès total
- ✅ Gestion paramètres critiques
- ✅ Gestion rôles et permissions
- ✅ Logs système complets

#### Admin
- ✅ Gestion utilisateurs
- ✅ Gestion catégories
- ✅ Gestion annonces/commandes
- ❌ Paramètres critiques

#### Modérateur
- ✅ Gestion annonces
- ✅ Modération IA
- ❌ Gestion utilisateurs
- ❌ Paramètres

#### Support
- ✅ Gestion litiges
- ✅ Vue commandes
- ❌ Modification annonces
- ❌ Paramètres

### Audit et Logs
- **Tracking des actions**
  - Qui a fait quoi
  - Quand
  - Depuis quelle IP
  - Modifications avant/après

## 🎨 Interface Utilisateur

### Design System
- **Couleurs**
  - Primaire : Blue gradient (#3b82f6 → #8b5cf6)
  - Success : Green (#52c41a)
  - Warning : Orange (#faad14)
  - Error : Red (#ff4d4f)
  - Info : Blue (#1890ff)

- **Composants**
  - Cards avec shadow
  - Boutons gradient
  - Tags colorés par statut
  - Badges numériques
  - Modales centrées
  - Tables responsives

### Responsive
- ✅ Mobile first
- ✅ Tablette optimisée
- ✅ Desktop large écran
- ✅ Sidebar collapsible

### Animations
- Fade in au chargement
- Transitions douces
- Hover effects
- Loading states
- Skeleton screens

## 📊 Analytics (à implémenter)

### Métriques avancées
- Taux de conversion
- Temps moyen de modération
- Performance des livreurs
- Catégories populaires
- Revenus par vendeur
- Churn rate

### Rapports
- Export PDF
- Export Excel
- Graphiques personnalisés
- Filtres par période
- Comparaisons

## 🔄 WebSocket

### Notifications temps réel
- Nouvelles commandes
- Enchères en cours
- Messages support
- Alertes système
- Position livreurs

### Événements
- `order:new` - Nouvelle commande
- `auction:bid` - Nouvelle enchère
- `delivery:update` - MAJ livraison
- `moderation:flag` - Nouveau signalement

## 🚀 Fonctionnalités futures

- [ ] Chat intégré support
- [ ] Carte interactive livraisons
- [ ] IA pour scoring vendeurs
- [ ] Export de données avancé
- [ ] API publique
- [ ] Mobile app (React Native)
- [ ] Notifications push
- [ ] Dashboard personnalisable
- [ ] Thème sombre
- [ ] Multi-langue complet
- [ ] Analytics avancé
- [ ] A/B Testing
- [ ] Email marketing intégré
- [ ] Gestion des promotions
- [ ] Programme de fidélité

---

**Version**: 1.0.0  
**Dernière mise à jour**: Décembre 2025

