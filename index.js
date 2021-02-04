const express = require("express");
const connection = require("./config");

const cors = require("cors");

const port = 4000;
const app = express();

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Welcome to my portfolio");
});

// GET ALL PROJECTS
app.get("/projects", (request, response) => {
  connection.query("SELECT * from project", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving albums");
    } else {
      response.status(200).json(results);
    }
  });
});

// GET ALL TECHNOS
app.get("/technos", (request, response) => {
  connection.query("SELECT * from techno", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving technos");
    } else {
      response.status(200).json(results);
    }
  });
});

// GET PROJECTS BY ID
app.get("/projects/:id", (req, res) => {
  connection.query(
    "SELECT * from project WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving projects");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// CREATE PROJECT(S)
app.post("/projects", (req, res) => {
  const {
    title,
    year_project,
    description_project,
    project_url,
    id_techno,
  } = req.body;
  connection.query(
    "INSERT INTO project(title, year_project, description_project, project_url, id_techno) VALUES(?, ?, ?, ?, ?)",
    [title, year_project, description_project, project_url, id_techno],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a project");
      } else {
        res.status(200).send("Project(s) successfully saved");
      }
    }
  );
});

// CREATE TECHNO(S)
app.post("/technos", (req, res) => {
  const { title } = req.body;
  connection.query(
    "INSERT INTO techno(title) VALUES(?)",
    [title],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a techno");
      } else {
        res.status(200).send("Techno(s) successfully saved");
      }
    }
  );
});

// UPDATE PROJECT BY ID
app.put("/projects/:id", (req, res) => {
  const idProject = req.params.id;
  const newProject = req.body;

  connection.query(
    "UPDATE project SET ? WHERE id = ?",
    [newProject, idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a project");
      } else {
        res.status(200).send("Project updated successfully 🎉");
      }
    }
  );
});

// UPDATE TECHNO BY ID
app.put("/technos/:id", (req, res) => {
  const id_techno = req.params.id;
  const newTechno = req.body;

  connection.query(
    "UPDATE techno SET ? WHERE id = ?",
    [newTechno, id_techno],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a techno");
      } else {
        res.status(200).send("Techno updated successfully 🎉");
      }
    }
  );
});

/* // DELETE ALBUM BY ID (not working)
app.delete("/albums/:id", (req, res) => {
  const idAlbum = req.params.id;

  connection.query(
    "DELETE FROM albums WHERE id = ?",
    [idAlbum],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting an album");
      } else {
        res.status(200).send("🎉 Album deleted!");
      }
    }
  );
}); */

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
