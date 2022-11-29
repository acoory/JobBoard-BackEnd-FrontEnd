require("dotenv").config();
const express = require("express");
const DBCONNECT = require("./db");
const userRoutes = require("./routes/user.routes");
const companieRoute = require("./routes/compagnie.routes");
const advertisementRoute = require("./routes/advertisements.routes");
const jobapplicationRoute = require("./routes/jobapplication.routes");
const authRoute = require("./routes/auth.routes");
const favorisRoute = require("./routes/favoris.routes");
const path = require("path");

//

// On se connecte à la base de donnée

// On crée l'application express
const app = express();

//On applique helmet pour sécuriser toutes nos requêtes/responses

// Cross-Origin Resource Sharing, permet au serveur de renvoyer les en-têtes HTTP requis par la norme CORS.
app.use((req, res, next) => {
  // Permet d'accéder à notre api depuis n'importe quelle origine '*'
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Envoyer des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  // éviter les erreurs par rapport à helmet, quand les ressources ne sont pas de la même origine
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

// On rend le body de notre requête accessible comme un objet javascript
// app.use(express.json());

app.use(express.json());

// ROUTES
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use("/api/user", userRoutes);
app.use("/api/companie", companieRoute);
app.use("/api/advertisement", advertisementRoute);
app.use("/api/jobapplication", jobapplicationRoute);
app.use("/api/auth", authRoute);
app.use("/api/favoris", favorisRoute);


module.exports = app;
