const con = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE USER
exports.CreateUser = (req, res) => {
  const profilPicture = req.files.profilPicture
    ? `${req.protocol}://${req.get("host")}/upload/${
        req.files.profilPicture[0].filename
      }`
    : "";
  const cv = req.files.cv
    ? `${req.protocol}://${req.get("host")}/upload/${req.files.cv[0].filename}`
    : "";

  con.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    (err, data) => {
      if (data.length === 0) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            let passwordHash = hash;
            const sql =
              "INSERT INTO people (name, firstname, email, password, adress, postalcode, city, tel, cv, profilPicture, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
            con.query(
              sql,
              [
                req.body.name,
                req.body.firstname,
                req.body.email,
                passwordHash,
                req.body.adress,
                req.body.postalcode,
                req.body.city,
                req.body.tel,
                cv,
                profilPicture,
                "ROLE_USER",
              ],
              (err, data) => {
                if (err)
                  res.status(400).json({
                    message:
                      "Le serveur ne peut pas renvoyer de réponse en raison d'une erreur côté client.",
                    err,
                  });
                else
                  con.query(
                    "SELECT * FROM people WHERE id = ?",
                    [data.insertId],
                    (err, data) => {
                      if (err) throw res.status(400).json(err);
                      res.status(200).json({
                        email: data[0].email,
                        userId: data[0].id,
                        profilPicture: data[0].profilPicture,
                        cv: data[0].cv,
                        name: data[0].name,
                        firstname: data[0].firstname,
                        role: data[0].role,
                        token: jwt.sign(
                          { userId: data[0].id },
                          "RANDOM_TOKEN_SECRET",
                          {
                            expiresIn: "24h",
                          }
                        ),
                      });
                    }
                  );
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ message: "Connexion échouée" });
          });
      } else {
        res.status(400).json("Email déjà associé à un compte.");
      }
    }
  );
};

// READ DATA FROM ALL PEOPLE
exports.ReadAllUser = (req, res, next) => {
  con.query("SELECT * FROM people ", (err, data) => {
    if (err)
      if (data.length === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else res.status(200).send(data);
  });
};

// USER MODIFY HIS PROFIL

exports.UpdateUser = (req, res) => {
  const profilPicture = req.files.profilPicture
    ? `${req.protocol}://${req.get("host")}/upload/${
        req.files.profilPicture[0].filename
      }`
    : "";

  const cv = req.files.cv
    ? `${req.protocol}://${req.get("host")}/upload/${req.files.cv[0].filename}`
    : "";

  con.query(
    "UPDATE people SET name = ?, firstname= ?, email = ?, adress = ?, postalcode = ?, city = ?, tel = ?, cv = ?, profilPicture = ? WHERE id = ?",
    [
      req.body.name,
      req.body.firstname,
      req.body.email,
      req.body.adress,
      req.body.postalcode,
      req.body.city,
      req.body.tel,
      cv,
      profilPicture,
      req.params.id,
    ],
    (err, data) => {
      if (data.affectedRows === 0)
        res.status(404).json("La ressource demandée est introuvable");
      else {
        con.query(
          "SELECT * FROM people WHERE id = ?",
          [req.params.id],
          (err, data) => {
            if (err) throw res.status(400).json(err);
            res.status(200).json({
              email: data[0].email,
              userId: data[0].id,
              profilPicture: data[0].profilPicture,
              cv: data[0].cv,
              role: data[0].role,
              token: jwt.sign({ userId: data[0].id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          }
        );
      }
    }
  );
};

exports.UpdatePassword = (req, res) => {
  con.query(
    "SELECT * FROM people WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (data.length === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else
        bcrypt
          .compare(req.body.currentPassword, data[0].password)
          .then(function (result) {
            if (!result) {
              res.status(401).json("Mot de passe incorrect");
            } else
              bcrypt.hash(req.body.password, 10).then((hash) => {
                let passwordHash = hash;
                con.query(
                  "UPDATE people SET password = ? WHERE id = ?",
                  [passwordHash, req.params.id],
                  (err, data) => {
                    if (data.affectedRows === 0)
                      res.status(404).json({
                        message: "La ressource demandée est introuvable",
                      });
                    else
                      res.status(200).json("Mot de passe modifié avec succès");
                  }
                );
              });
          });
    }
  );
};

// SUPPRIMER UN USER
exports.DeleteUser = (req, res) => {
  con.query("DELETE FROM people WHERE id = ?", [req.params.id], (err, data) => {
    if (err)
      if (data.affectedRows === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else res.status(200).json(data);
  });
};
// RECUPERER LES INFOS D'UN USER
exports.ReadOneUser = (req, res, next) => {
  con.query(
    "SELECT * FROM people WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (data.length === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else res.status(200).json(data[0]);
    }
  );
};
