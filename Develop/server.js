const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

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
  // console.info(`${req.method} request received`);

  var fileData = JSON.parse(fs.readFileSync("./db/db.json", 
    (err, data) => err ? console.error(err) : console.log ("success reading - page get request")
  ));

  res.json(fileData);

});

// SAVE NOTE
app.post('/api/notes', (req, res) => {
    var fileData = JSON.parse(fs.readFileSync("./db/db.json", 
    (err, data) => err ? console.error(err) : console.info ("success reading - save note")
  ));
  
  fileData.push(req.body);

  fs.writeFileSync("./db/db.json", JSON.stringify(fileData),
    (err, data) => err ? console.error(err) : console.info ("success adding note")
  );

  res.json(`POST request received.  Note added`);
});

// DELETE NOTE
app.delete('/api/notes/:id', (req, res) => {



});



// WILDCARD ROUTES
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
 });

// Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);