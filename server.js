const inquirer = require("inquirer");
const fs = require("fs");
const express = require("express");
const app = express();

//adding id's

const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("./Develop/public"));

// app.get("/notes", function(req, res) {
//     res.sendFile(path.join(__dirname,"./Develop/public/notes.html"))
// })
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// app.get("/api/notes", function(req, res) {

//    var noteFile = fs.readFileSync(path.join(__dirname,"./Develop/db/db.json"), "utf8")

//     res.json(JSON.parse(noteFile))
// })

//  app.post("/api/notes", function(req, res) {

//    var readFile = fs.readFileSync(path.join(__dirname,"./Develop/db/db.json"))
//     readFile = JSON.parse(readFile);

//     req.body.id = readFile.length +1;

//      var body = req.body;
//     readFile.push(body);
//     console.log(readFile)

//     var noteFileArray = fs.writeFileSync(path.join (__dirname,"./Develop/db/db.json"), JSON.stringify(readFile));
//     console.log(noteFileArray)

//     res.json(noteFileArray)

//  })

app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const db = JSON.parse(data);
    const newDB = [];

    db.push(req.body);

    for (let i = 0; i < db.length; i++) {
      const newNote = {
        title: db[i].title,
        text: db[i].text,
        id: i,
      };

      newDB.push(newNote);
    }

    fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(newDB, null, 2),
      (err) => {
        if (err) throw err;
        res.json(req.body);
      }
    );
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    const db = JSON.parse(data);
    const newDB = [];

    for (let i = 0; i < db.length; i++) {
      if (i !== id) {
        const newNote = {
          title: db[i].title,
          text: db[i].text,
          id: newDB.length,
        };

        newDB.push(newNote);
      }
    }

    fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(newDB, null, 2),
      (err) => {
        if (err) throw err;
        res.json(req.body);
      }
    );
  });
});

//console.log(answers)  // app.delete('/api/notes/:id', function(req, res, next) {
//     req.params.id
//     res.send({type:'DELETE'});
// });

app.listen(3001, () => {
  console.log(`API server now on port ${PORT}!`);
});
