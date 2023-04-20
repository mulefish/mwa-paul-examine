const express = require('express');
const path = require('path');
const app = express();
const port = 4040

app.get('/bagOfFunctions.js', function(req, res) {
  console.log("bagOfFunctions.js")
  res.sendFile(__dirname + '/bagOfFunctions.js');
});
app.get('/index.js', function(req, res) {
  console.log("index.js")
  res.sendFile(path.join(__dirname, '/index.js'));
});

app.get('/lookatme', function(req, res) {
  console.log("lookatme")
  res.sendFile(path.join(__dirname, '/lookatme.html'));
});
app.get('/hello', function(req, res) {
  console.log("hello")
  res.sendFile(path.join(__dirname, '/hello.html'));
});

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
