const con = require("../db");

// CREATE JOBAPPLICATION
exports.Create = (req, res) => {
  const newdate = new Date();

  const year = newdate.getFullYear();
  const month = newdate.getMonth() + 1;
  const day = newdate.getDate();
  const date = [year, month, day].join("-");
  console.log(req.body);
  con.query(
    "INSERT INTO `jobApplication` (`advertisement_id`, `people_id`, `created_at`, `status`, `motivation_letter`, `cv`, `companie_name`, `people_name`, `advertisement_title`, `people_firstname`) VALUES (?,?,?,?,?,?,?,?,?, ?);",
    [
      req.body.advertisement_id,
      req.body.people_id,
      date,
      0,
      req.body.motivation_letter,
      req.body.cv,
      req.body.companie_name,
      req.body.people_name,
      req.body.advertisement_title,
      req.body.people_firstname,
    ],
    (err, data) => {
      if (err) res.status(400).json(err);
      con.query(
        "SELECT * FROM jobApplication WHERE id = ?",
        [data.insertId],
        (err, data) => {
          if (err) res.status(400).send(err);
          else res.status(200).json(data[0]);
        }
      );
    }
  );
};

//READ ALL JOB APPLICATION
exports.Read = (req, res) => {
  con.query("SELECT * FROM jobApplication", (err, data) => {
    if (err) throw res.status(400).json(err);

    res.status(200).json(data);
  });
};

// READ ONE JOB APPLICATION
exports.ReadOne = (req, res) => {
  con.query(
    "SELECT * FROM jobApplication WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) throw res.status(400).json(err);

      res.status(200).json(data[0]);
    }
  );
};

// UPDATE JOBAPPLICATION WHERE ID
exports.Update = (req, res) => {
  con.query(
    "UPDATE jobApplication SET status = ? WHERE id = ?",
    [req.body.status, req.params.id],
    (err, data) => {
      if (err) throw res.status(400).json(err);
      con.query(
        "SELECT * FROM jobApplication WHERE id = ?",
        [req.params.id],
        (err, data) => {
          if (err) throw res.status(400).json(err);
          res.status(200).json(data[0]);
        }
      );
    }
  );
};

// DELETE JOB APPLICATION WHERE ID
exports.Delete = (req, res) => {
  con.query(
    "DELETE FROM jobApplication WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) throw res.status(400).json(err);
      res.status(200).json("Succes");
    }
  );
};
