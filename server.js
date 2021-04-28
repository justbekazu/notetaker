const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const app = express();
const path = require("path");
const uniqid = require("uniqid");



const PORT = process.env.PORT || 3001;

  // parse incoming string or array data
  app.use(express.urlencoded({ extended: true }));
  // parse incoming JSON data
  app.use(express.json());

  app.use(express.static("./Develop/public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"./Develop/public/notes.html"))
})



app.get("/api/notes", function(req, res) {

   var noteFile = fs.readFileSync(path.join(__dirname,"./Develop/db/db.json"), "utf8")
  
    res.json(JSON.parse(noteFile))
})

 app.post("/api/notes", function(req, res) {
     console.log(JSON.stringify(body))
      fs.appendFile((path.join(__dirname,"./Develop/db/db.json")), JSON.stringify(body), function (err) {
        if (err) throw err;
         console.log('Saved!');
       });
      console.log("hello")
 })
 
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname,"./Develop/public/index.html"))
})



  //console.log(answers)  // app.delete('/api/notes/:id', function(req, res, next) {
    //     req.params.id
    //     res.send({type:'DELETE'});
    // });

 
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
    });