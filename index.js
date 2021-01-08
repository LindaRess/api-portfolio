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

app.get("/albums", (request, response) => {
  connection.query("SELECT * from albums", (err, results) => {
    if (err) {
      response.status(500).send("Error retrieving albums");
    } else {
      response.status(200).json(results);
    }
  });
});

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
        res.status(200).send("Successfully saved");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
