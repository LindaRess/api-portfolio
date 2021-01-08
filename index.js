const express = require("express");
const connection = require("./config");

const port = 3000;
const app = express();

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.use(express.json());

app.get("/", (req, res) => {
  console.log(request);
  res.send("Welcome to my favorite albums list");
});

// GET ALL ALBUMS
app.get("/albums", (request, response) => {
  connection.query("SELECT * from albums", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving albums");
    } else {
      response.status(200).json(results);
    }
  });
});

// GET ALL TRACKS
app.get("/tracks", (request, response) => {
  connection.query("SELECT * from tracks", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving albums");
    } else {
      response.status(200).json(results);
    }
  });
});

// GET ALBUMS BY ID
app.get("/albums/:id", (req, res) => {
  connection.query(
    "SELECT * from albums WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving albums");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// CREATE ALBUM(S)
app.post("/albums", (req, res) => {
  const { title, genre, picture, artist } = req.body;
  connection.query(
    "INSERT INTO albums(title, genre, picture, artist) VALUES(?, ?, ?, ?)",
    [title, genre, picture, artist],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving an album");
      } else {
        res.status(200).send("Album(s) successfully saved");
      }
    }
  );
});

// CREATE TRACK(S)
app.post("/tracks", (req, res) => {
  const { title, youtube_url, id_album } = req.body;
  connection.query(
    "INSERT INTO tracks(title, youtube_url, id_album) VALUES(?, ?, ?)",
    [title, youtube_url, id_album],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a track");
      } else {
        res.status(200).send("Track(s) successfully saved");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
