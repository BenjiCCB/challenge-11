const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);
    console.info(req.body);
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);