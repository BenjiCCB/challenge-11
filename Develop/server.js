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

app.get('/api/notes', (req, res) => {
  // console.info(`${req.method} request received`);

  var fileData = JSON.parse(fs.readFileSync("./db/db.json", 
    (err, data) => err ? console.error(err) : console.log ("success reading - page get request")
  ));
  // console.info(fileData);

  res.json(fileData);

});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received - save notes`);
  
  var fileData = JSON.parse(fs.readFileSync("./db/db.json", 
    (err, data) => err ? console.error(err) : console.log ("success reading - save notes")
  ));
  
  fileData.push(req.body);

  console.info(fileData)

  fs.writeFileSync("./db/db.json", JSON.stringify(fileData),
    (err, data) => err ? console.error(err) : console.log ("success adding note")
  );

  // console.info(req.body);
  res.json(`${req.method} request received.  Note added`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
 });

// Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);