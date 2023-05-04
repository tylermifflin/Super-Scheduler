// calling express, path and fs
const express = require('express');
const path = require('path');
const fs = require('fs');
// calling uuid to generate unique id for each note
const { v4: uuidv4 } = require('uuid');
// using process.env.port to allow heroku to set port
const PORT = process.env.port || 3001;
// calling express in app
const app = express();
// using express to parse incoming string or array data, and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use express.static to serve up the public folder as a static directory
app.use(express.static('public'));
// get route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'));
    );
// get route for index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
    );



