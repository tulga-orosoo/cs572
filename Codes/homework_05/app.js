const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/users', function(req, res) {
  res.status(200);
  res.set('Content-type', 'text/html');
  res.send("Hi");
  res.end();
});

app.listen(port, function() {
  console.log("The server is running on port %s", port);
})