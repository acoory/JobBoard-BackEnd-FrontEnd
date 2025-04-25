-- Suppression de la base de données si elle existe déjà
DROP DATABASE IF EXISTS jobboard;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS jobboard;

-- Utilisation de la base de données
USE jobboard;

-- Table des utilisateurs (people)
CREATE TABLE IF NOT EXISTS people (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  firstname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  adress VARCHAR(255),
  postalcode VARCHAR(10),
  city VARCHAR(100),
  tel VARCHAR(20),
  cv VARCHAR(255),
  profilPicture VARCHAR(255),
  role VARCHAR(50) DEFAULT 'ROLE_USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des entreprises (companie)
CREATE TABLE IF NOT EXISTS companie (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  role VARCHAR(50) DEFAULT 'ROLE_COMPANIE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des annonces (advertisement)
CREATE TABLE IF NOT EXISTS advertisement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  title_filter VARCHAR(255),
  companie_id INT NOT NULL,
  description TEXT,
  location VARCHAR(255),
  type VARCHAR(50),
  salarie VARCHAR(100),
  companie_name VARCHAR(255),
  avantage TEXT,
  phrase_accroche TEXT,
  nbrePost INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (companie_id) REFERENCES companie(id) ON DELETE CASCADE
);

-- Table des candidatures (jobapplication)
CREATE TABLE IF NOT EXISTS jobapplication (
  id INT PRIMARY KEY AUTO_INCREMENT,
  people_id INT NOT NULL,
  advertisement_id INT NOT NULL,
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'En attente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (advertisement_id) REFERENCES advertisement(id) ON DELETE CASCADE
);

-- Table des favoris
CREATE TABLE IF NOT EXISTS favoris (
  id INT PRIMARY KEY AUTO_INCREMENT,
  people_id INT NOT NULL,
  advertisement_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (people_id) REFERENCES people(id) ON DELETE CASCADE,
  FOREIGN KEY (advertisement_id) REFERENCES advertisement(id) ON DELETE CASCADE
);

-- Création d'un index pour les recherches d'annonces
CREATE INDEX idx_advertisement_title ON advertisement(title);
CREATE INDEX idx_advertisement_location ON advertisement(location);
CREATE INDEX idx_advertisement_type ON advertisement(type);

-- Création d'un index pour les recherches utilisateurs
CREATE INDEX idx_people_email ON people(email);

-- Création d'un index pour les recherches entreprises
CREATE INDEX idx_companie_email ON companie(email); 