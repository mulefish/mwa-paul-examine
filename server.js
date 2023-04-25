const express = require('express');
const path = require('path');
const app = express();
const port = 4040



app.get('/really_pink.png', function(req, res) {
  console.log("really_pink.png")
  res.sendFile(__dirname + '/really_pink.png');
});


app.get('/color', function(req, res) {
  console.log("color.html")
  res.sendFile(__dirname + '/color.html');
});

app.get('/color2', function(req, res) {
  console.log("color2.html")
  res.sendFile(__dirname + '/color2.html');
});

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
