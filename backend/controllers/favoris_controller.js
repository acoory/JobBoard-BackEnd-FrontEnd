const con = require("../db");

exports.Delete = (req, res) => {
  con.query("DELETE FROM favoris WHERE id= ?", [req.params.id], (err, data) => {
    if (err) throw res.status(401).json("Une erreur est survenue");
    res.status(200).json({ message: "Success" });
  });
};
