# Backend JobBoard

Ce dépôt contient le code backend d'une application de type "Job Board" permettant de publier et consulter des offres d'emploi.

## Configuration de la base de données

### Option 1: Utiliser Docker Compose (recommandé)

Pour lancer facilement la base de données MySQL avec Docker Compose:

1. Assurez-vous que Docker et Docker Compose sont installés sur votre système
2. À la racine du projet, exécutez:
   ```
   docker-compose up -d
   ```
3. La base de données sera automatiquement initialisée avec le script db-init.sql
4. Vous pouvez accéder à phpMyAdmin sur http://localhost:8081
   - Utilisateur: root
   - Mot de passe: celui défini dans DB_PASSWORD (par défaut: root)

### Option 2: Installation manuelle

Pour configurer manuellement la base de données:

1. Assurez-vous que MySQL est installé sur votre système
2. Connectez-vous à MySQL en ligne de commande:
   ```
   mysql -u root -p
   ```
3. Importez le script d'initialisation de la base de données:
   ```
   source /chemin/vers/db-init.sql
   ```
   ou alternativement:
   ```
   mysql -u root -p < /chemin/vers/db-init.sql
   ```

## Variables d'environnement

Renommez le fichier `.env.example` en `.env` et modifiez les valeurs selon votre configuration:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=jobboard
PORT=3000
JWT_SECRET=votre_secret_jwt
```

## Installation des dépendances

```
npm install
```

## Démarrage du serveur

```
npm start
```

ou en mode développement:

```
npx nodemon server.js
```

## Structure de la base de données

La base de données contient les tables suivantes:

1. **people**: Utilisateurs du site (chercheurs d'emploi)
2. **companie**: Entreprises qui publient des offres d'emploi
3. **advertisement**: Annonces d'emploi publiées par les entreprises
4. **jobapplication**: Candidatures des utilisateurs aux offres d'emploi
5. **favoris**: Offres d'emploi favorites des utilisateurs

Veuillez consulter le fichier `db-init.sql` pour voir le schéma détaillé de chaque table. 