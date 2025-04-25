const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Création de la connexion à la base de données MySQL
const con = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jobboard',
  multipleStatements: true // Important pour exécuter plusieurs requêtes SQL en une fois
});

// Connexion à la base de données
con.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connexion à la base de données MySQL établie avec succès');
  
  // Charger et exécuter les fichiers SQL
  importData();
});

// Fonction pour importer les données de test
async function importData() {
  try {
    // 1. Insérer les entreprises et annonces
    const advertisementsSql = fs.readFileSync(path.join(__dirname, 'exemple-donnees.sql'), 'utf8');
    console.log('Insertion des entreprises et des annonces...');
    await executeQuery(advertisementsSql);
    
    // 2. Insérer les utilisateurs, candidatures et favoris
    const usersSql = fs.readFileSync(path.join(__dirname, 'sample-users.sql'), 'utf8');
    console.log('Insertion des utilisateurs, candidatures et favoris...');
    await executeQuery(usersSql);
    
    console.log('Données de test importées avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'importation des données:', error);
    process.exit(1);
  }
}

// Fonction utilitaire pour exécuter des requêtes SQL
function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
} 