const express = require('express');
const path = require('path');
const app = express();
const port = 4040

app.get('/index.js', function(req, res) {
  console.log("index.js")
  res.sendFile(path.join(__dirname, '/index.js'));
});

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
