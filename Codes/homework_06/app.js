const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const port = 3000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(cors());
app.use(express.json())
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.get('/grades', function(req, res) {
  res.json({'message': "All grades are selected"});
  res.end();
});

app.post('/grades/add', function(req, res) {
  if(!req.body || !req.body.name || !req.body.course || !req.body.grade) {
    return sendError(res);
  }

  const newValues = {
    name: req.body.name, 
    course: req.body.course, 
    grade: req.body.grade
  };

  res.json({'message': "New grade created", data: newValues});
  res.end();
});

app.get('/grades/:id', function (req, res) {
  if(!req.params.id) {
    return sendError(res);
  }

  res.json({'message': "Grade selected with ID: "+ req.params.id});
  res.end();
});

app.delete('/grades/:id', function (req, res) {
  if(!req.params.id) {
    return sendError(res);
  }

  res.json({'message': "Grade deleted with ID: "+ req.params.id});
  res.end();
})

app.put('/grades/:id', function(req, res) {
  if(!req.params.id) {
    return sendError(res);
  }

  if(!req.body || !req.body.name || !req.body.course || !req.body.grade) {
    return sendError(res);
  }

  const newValues = {
    name: req.body.name, 
    course: req.body.course, 
    grade: req.body.grade
  };

  res.json({'message': "Grade updated with id: " + req.params.id, data: newValues});
  res.end();
});



app.listen(port, function() {
  console.log("The server is running on port %s", port);
});

function sendError(res, msg = 'This is an error!') {
  res.status(400).send({
    message: msg
  });
}