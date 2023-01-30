const express = require('express');
const path = require('path');

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

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    console.info(req.body);
    res.json(`${req.method} request received`);
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);