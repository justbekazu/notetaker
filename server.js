const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

  // parse incoming string or array data
  app.use(express.urlencoded({ extended: true }));
  // parse incoming JSON data
  app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"./Develop/public/notes.html"))
})



    //const { notes } = require('.Develop/db.json');
//const { Router } = require("express");



    app.delete('/api/notes/:id', function(req, res, next) {
        req.params.id
        res.send({type:'DELETE'});
    });

 
app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
    });