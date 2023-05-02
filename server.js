const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
app.get('/version2', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/version3.html'));
});
app.get('/version3.js', function(req, res) {
  res.sendFile(path.join(__dirname, '/version3.js'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);