const con = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE DATA COMPANIE
exports.Create = (req, res) => {
  const logo = req.files.profilPicture
    ? `${req.protocol}://${req.get("host")}/upload/${
        req.files.profilPicture[0].filename
      }`
    : "";
  con.query(
    "SELECT * FROM companie WHERE email = ?",
    [req.body.email],
    (err, data) => {
      if (data.length === 0) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            let passwordHash = hash;

            const sql =
              "INSERT INTO companie (email, name, password, logo, role) VALUES (?, ?, ?, ?, ?)";
            con.query(
              sql,
              [
                req.body.email,
                req.body.name,
                passwordHash,
                logo,
                "ROLE_COMPANIE",
              ],
              (err, data) => {
                if (err) res.status(400).json(err);
                else {
                  con.query(
                    "SELECT * FROM companie WHERE id = ?",
                    [data.insertId],
                    (err, data) => {
                      if (err) {
                        res.status(400).json(err);
                      } else {
                        res.status(200).json({
                          email: data[0].email,
                          userId: data[0].id,
                          role: data[0].role,
                          logo: data[0].logo,
                          token: jwt.sign(
                            { userId: data[0].id },
                            "RANDOM_TOKEN_SECRET",
                            {
                              expiresIn: "24h",
                            }
                          ),
                        });
                      }
                    }
                  );
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ message: "Connexion échouée" });
          });
      } else res.status(400).json("Email déjà associer à un compte");
    }
  );
};

// READ ALL DATA FROM COMPANIE
exports.Read = (req, res) => {
  con.query("SELECT * FROM companie ", (err, data) => {
    if (data.length === 0) res.status(err.code).json(err);
    else res.status(200).send(data);
  });
};

// READ ON DATA FROM COMPANIE
exports.ReadOne = (req, res) => {
  con.query(
    "SELECT * FROM companie WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (data.length === 0)
        res
          .status(400)
          .json({ message: "La ressource demandée est introuvable" });
      else res.status(200).json(data[0]);
    }
  );
};

// UPDATE DATA WHERE ID
exports.Put = (req, res) => {
  const logo = req.files.profilPicture
    ? `${req.protocol}://${req.get("host")}/upload/${
        req.files.profilPicture[0].filename
      }`
    : "";
  con.query(
    "SELECT email FROM companie WHERE email = ? AND ID NOT IN (?)",
    [req.body.email, req.params.id],
    (err, data) => {
      if (data.length === 0) {
        con.query(
          "SELECT * FROM people WHERE email = ?",
          [req.body.email],
          (err, data) => {
            if (data.length === 0) {
              const sql =
                "UPDATE companie SET email = ?, name = ?, logo = ? WHERE id = ?";
              con.query(
                sql,
                [req.body.email, req.body.name, logo, req.params.id],
                (err, data) => {
                  if (err) {
                    res.status(404).json({
                      message: "La ressource demandée est introuvable",
                    });
                  } else {
                    con.query(
                      "SELECT * FROM companie WHERE id = '" +
                        req.params.id +
                        "'",
                      (err, data) => {
                        if (err) res.status(400).json(err);
                        else {
                          res.status(200).json({
                            email: data[0].email,
                            userId: data[0].id,
                            logo: data[0].logo,
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
                      }
                    );
                  }
                }
              );
            } else res.status(400).json("Email déjà associer à un compte");
          }
        );
      } else res.status(400).json("Email déjà associer à un compte");
    }
  );
};

// UPDATE PASSWORD COMPANIE
exports.UpdatePassword = (req, res) => {
  con.query(
    "SELECT * FROM companie WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (data.length === 0)
        res
          .status(400)
          .json({ message: "La ressource demandée est introuvable" });
      else {
        const oldPassword = data[0].password;
        const userId = data[0].id;

        bcrypt
          .compare(req.body.oldPassword, oldPassword)
          .then((valid) => {
            if (!valid) {
              res.status(401).json("Mot de passe actuelle incorrect");
            } else {
              bcrypt.hash(req.body.newPassword, 10).then((hash) => {
                let passwordHash = hash;
                con.query(
                  "UPDATE companie SET password = ? WHERE id = ?",
                  [passwordHash, req.params.id],
                  (err, data) => {
                    if (err) res.status(400).json(err);
                    else {
                      res.status(200).json({
                        userId: userId,
                        token: jwt.sign(
                          { userId: userId },
                          "RANDOM_TOKEN_SECRET",
                          { expiresIn: "24h" }
                        ),
                      });
                    }
                  }
                );
              });
            }
          })
          .catch((error) => res.status(500).json(error));
      }
    }
  );
};

// DELETE DATA COMPANIE WHERE ID
exports.Delete = (req, res) => {
  con.query(
    "DELETE FROM companie WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else {
        res.status(200).send({ message: "La ressource à était supprimer" });
      }
    }
  );
};
