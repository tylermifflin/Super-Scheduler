// calling express, path and fs
const express = require('express');
const path = require('path');
const fs = require('fs');
// calling my db.json file to use to save notes
let notesdata = require('./db/db.json');
// calling uuid to generate unique id for each note
const { v4: uuidv4 } = require('uuid');
// using process.env.port to allow heroku to set port
const PORT = process.env.PORT || 3001;
// calling express in app
const app = express();
// using express to parse incoming string or array data, and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// use express.static to serve up the public folder as a static directory
app.use(express.static('public'));
// get route for notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
    );

// get route for api/notes
app.get('/api/notes', (req, res) => res.json(notesdata));
   
// post route for api/notes
app.post('/api/notes', (req, res) => {
    // read notes from db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // parse data from db.json
            const notes = JSON.parse(data);
            // create new note with unique id
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uuidv4(),
            };
            // push new note to notes array
            notes.push(newNote);
            notesdata = notes
            // write new note to db.json on a separate line
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) =>
                err ? console.error(err) : console.log('Note added!')
            );
            // return notes as json
            res.json(notes);

        }
    });
}); 
// delete route for api/notes
app.delete('/api/notes/:id', (req, res) => {
    // read notes from db.json
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // parse data from db.json
            const notes = JSON.parse(data);
            // filter notes array to exclude note with matching id
            const newNotes = notes.filter((note) => note.id !== req.params.id);
            notesdata = newNotes
            // write new note to db.json on a separate line
            fs.writeFile('./db/db.json', JSON.stringify(newNotes, null, 4), (err) =>
                err ? console.error(err) : console.log('Note deleted!')
            );
            // return notes as json
            res.json(newNotes);
        }
    });
});
// get route for index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
    );

// listen for PORT
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);







           



        




