# JobBoard - Plateforme de recrutement

Une plateforme complète de gestion d'offres d'emploi permettant aux entreprises de publier des annonces et aux candidats de postuler.

<p>
<a href="https://postimg.cc/RW84LbSW" target="_blank"><img width="200" src="https://i.postimg.cc/RW84LbSW/Capture-d-e-cran-2025-04-25-a-14-06-33.png" alt="Capture-d-e-cran-2025-04-25-a-14-06-33"/></a><br/><br/>
<a href='https://postimg.cc/7bDD9zkn' target='_blank'><img width="200" src='https://i.postimg.cc/ryRm8GZ3/Capture-d-e-cran-2025-04-25-a-14-15-02.png' border='0' alt='Capture-d-e-cran-2025-04-25-a-14-15-02'/></a>
</p>

## Fonctionnalités

### Pour les candidats
- Création et gestion de compte
- Recherche d'offres d'emploi
- Candidature en ligne
- Gestion des candidatures
- Sauvegarde d'offres en favoris

### Pour les entreprises
- Création et gestion de profil entreprise
- Publication d'offres d'emploi
- Gestion des candidatures reçues
- Modification et suppression d'annonces

## Architecture technique

Le projet est divisé en deux parties principales:

### Frontend
- Développé avec React.js
- Interface utilisateur responsive
- Gestion d'état avec Context API

### Backend
- API RESTful avec Node.js et Express
- Base de données MySQL
- Authentification avec JWT
- Gestion des fichiers avec Multer

## Installation

### Prérequis
- Node.js (v12+)
- MySQL
- Docker et Docker Compose (optionnel)

### Installation de la base de données

#### Option 1: Avec Docker (recommandé)
```bash
# À la racine du projet
docker-compose up -d
```

La base de données MySQL et phpMyAdmin seront accessibles:
- MySQL: localhost:3306
- phpMyAdmin: http://localhost:8081 (utilisateur: root, mot de passe: root)

#### Option 2: Installation manuelle
```bash
# Importer le script SQL
mysql -u root -p < backend/db-init.sql
```

### Configuration du backend
```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Modifier les valeurs dans .env selon votre configuration

# Lancer le serveur backend
npm start
```

### Configuration du frontend
```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer l'application frontend
npm start
```

## Données de test

Pour initialiser la base de données avec des données de test:
```bash
cd backend
npm run seed
```

Comptes de test:
- **Utilisateur**: jean.dupont@example.com / mot de passe: test
- **Entreprise**: entreprise.test@example.com / mot de passe: test

## Licence

ISC

## Auteur

Isoardi Marius 