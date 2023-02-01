const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('./helpers/uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// GET NOTES
app.get('/api/notes', (req, res) => {

  var fileData = JSON.parse(fs.readFileSync("./db/db.json"));

  res.json(fileData);

});

// SAVE NOTE
app.post('/api/notes', (req, res) => {
  var fileData = JSON.parse(fs.readFileSync("./db/db.json"));

  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuid(),
  };

  fileData.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(fileData));

  res.send(`POST request received.  Note added`);
});

// DELETE NOTE
app.delete('/api/notes/:id', (req, res) => {

  const requestedNoteID = req.params.id;
  
  var fileData = JSON.parse(fs.readFileSync("./db/db.json"));
  
  for (let i = 0; i < fileData.length; i++) {
    const currentNoteID = fileData[i].id;
    if (requestedNoteID === currentNoteID) {
      fileData.splice(i, 1);
    }
  }
  
  fs.writeFileSync("./db/db.json", JSON.stringify(fileData));

  res.send(`DELETE request received.  Note deleted`);

});



// WILDCARD ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
 });

// Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);