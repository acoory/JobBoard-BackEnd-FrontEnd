const con = require("../db");

// CREATE ADVERDISEMENT
exports.Create = (req, res) => {
  console.log(req.body);
  con.query(
    "INSERT INTO advertisement (title,title_filter, companie_id, description, location, type, salarie, companie_name, created_at,avantage, phrase_accroche, nbrePost) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    // "INSERT INTO advertisement (title) VALUES ('hh')",
    [
      req.body.title,
      req.body.title_filter,
      req.body.companie_id,
      req.body.description,
      req.body.location,
      req.body.type,
      req.body.salarie,
      req.body.companie_name,
      req.body.created_at,
      req.body.avantage,
      req.body.phrase_accroche,
      req.body.nbrePost,
    ],
    (err, data) => {
      // if err est chargé de verifier que la requête d'insertion est valide afin de ne pas faire crasher le serveur node
      if (err)
        res.status(400).json({
          message:
            "Le serveur ne peut pas renvoyer de réponse en raison d'une erreur côté client.",
          err,
        });
      else {
        con.query(
          "SELECT * FROM advertisement WHERE id = ?",
          [data.insertId],
          (err, data) => {
            res.status(200).json(data[0]);
          }
        );
      }
    }
  );
};

// UPDATE UNE ANNONCE
exports.Update = (req, res) => {
  con.query(
    "UPDATE advertisement SET title= ?, description= ?, location= ?, type= ?, salarie= ?,avantage= ?, phrase_accroche= ?, nbrePost= ? WHERE id = ?",
    [
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.type,
      req.body.salarie,
      req.body.avantage,
      req.body.phrase_accroche,
      req.body.nbrePost,
      req.params.id,
    ],
    (err, data) => {
      // affectedRows vérifie que la ressource existe bien dans la base de donnée.
      if (err)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else {
        con.query(
          "SELECT * FROM advertisement WHERE id = ?",
          req.params.id,
          (err, data) => {
            res.status(200).json(data[0]);
          }
        );
      }
    }
  );
};
// RECUPERER LES INFOS D'UNE ANNONE
exports.ReadOne = (req, res, next) => {
  con.query(
    "SELECT * FROM advertisement WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (data.length === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else {
        res.status(200).json(data[0]);
      }
    }
  );
};
// SUPPRIMER UNE ANNONCE
exports.Delete = (req, res) => {
  con.query(
    "DELETE FROM advertisement WHERE id = ?",
    req.params.id,
    (err, data) => {
      if (data.affectedRows === 0)
        res
          .status(404)
          .json({ message: "La ressource demandée est introuvable" });
      else {
        res.status(200).send({ message: "La ressource à était supprimer" });
      }
    }
  );
};
// RECUPRER TOUTES LES ANNONCES
exports.ReadAll = (req, res) => {
  con.query("SELECT * FROM advertisement ", (err, data) => {
    if (err) throw res.status(400).json(err);

    res.status(200).json(data);
  });
};
