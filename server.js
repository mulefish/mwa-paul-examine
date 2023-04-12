const express = require('express');
const path = require('path');
const app = express();
const port = 4040


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/logic.js', function(req, res) {
  res.sendFile(path.join(__dirname, '/logic.js'));
});

app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
