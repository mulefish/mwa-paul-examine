const express = require('express');
const path = require('path');
const app = express();
const port = 4040


app.get('/everything', function(req, res) {
    console.log("everything")
  res.sendFile(__dirname + '/everything.json');
});
app.get('/fold3', function(req, res) {
  console.log("fold3")
  res.sendFile(path.join(__dirname, '/fold3.html'));
});

app.get('/fold2', function(req, res) {
  console.log("fold2")
  res.sendFile(path.join(__dirname, '/fold2.html'));
});
app.get('/fold', function(req, res) {
  console.log("fold")
  res.sendFile(path.join(__dirname, '/fold.html'));
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
