const con = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Auth = (req, res) => {
  con.query(
    "SELECT * FROM people WHERE email = ?",
    [req.body.email],
    (err, data) => {
      // data.length vérifie que le tableau contient un utilisateur afin d'empêcher le crash du server node.
      if (data.length > 0) {
        bcrypt.compare(req.body.password, data[0].password).then((valid) => {
          if (!valid) res.status(401).json({ message: "incorrect password" });
          else {
            res.status(200).json({
              email: data[0].email,
              userId: data[0].id,
              profilPicture: data[0].profilPicture,
              cv: data[0].cv,
              role: data[0].role,
              firstname: data[0].firstname,
              name: data[0].name,
              token: jwt.sign(
                { userId: data[0].id },
                "cf914fc3c97f643a2c40cdf62ef704e7aaa82551",
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        });
      } else {
        con.query(
          "SELECT * FROM companie WHERE email = ?",
          [req.body.email],
          (err, companie) => {
            if (companie.length > 0) {
              bcrypt
                .compare(req.body.password, companie[0].password)
                .then((valid) => {
                  if (!valid)
                    res.status(401).json({ message: "incorrect password" });
                  else {
                    res.status(200).json({
                      email: companie[0].email,
                      name: companie[0].name,
                      userId: companie[0].id,
                      role: companie[0].role,
                      logo: companie[0].logo,
                      token: jwt.sign(
                        { userId: companie[0].id },
                        "a19878c20b0ec8ac2146f372714b541e4222a2c9",
                        {
                          expiresIn: "24h",
                        }
                      ),
                    });
                  }
                });
            } else res.status(400).json({ message: "User not found" });
          }
        );
      }
    }
  );
};
