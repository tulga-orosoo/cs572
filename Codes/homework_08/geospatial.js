const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:myPassword@cluster0-b7azg.mongodb.net/test?retryWrites=true";

const app = express();
const port = 3000;
global.client = null;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true})); 

app.use(function(req, res, next) {
  function setCollectionAndNext() {
    req.mongoCollection = global.client.db('homework08').collection('fairfield_locations');
    next();
  }
  if(!global.client) {
    global.client = new MongoClient(uri, {useNewUrlParser: true});
    global.client.connect(err => {
      if(err) {
        sendError(res, err, "MongoDB connection error!");
      } else {
        setCollectionAndNext();
      }
    })
  } else {
    console.log("MongoDB connection is already established :).");
    setCollectionAndNext();
  }
});

app.get('/locations', function(req, res) {
  req.mongoCollection.find().toArray(function(err, docArr) {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-type', 'application/json');
      res.json(JSON.stringify(docArr));
      res.end();
    }
  })
});

//Example: http://localhost:3000/locations/search?limit=2&category=store

app.get('/locations/search', function(req, res) {
  let limit = req.query.limit && Number(req.query.limit) ? Number(req.query.limit) : 3;
  let category = req.query.category;
  let name = req.query.name;

  let query = {};
  if(req.query.name) {
    query.name = new RegExp(req.query.name, 'i');
  }
  if(req.query.category) {
    query.category = new RegExp(req.query.category, 'i');
  }

  query.location = {
    $near:
      { $geometry :
        { 
          type : "Point", 
          coordinates:[-91.9665342, 41.017654]
        }, 
        $maxDistance: 5000
      }
    };

    console.log(query);

  req.mongoCollection.find(query).limit(limit).toArray(function(err, docArr) {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Nearest '+limit+' location</strong> <br><br> <div><strong>Result:</strong><br><br><pre><code>'+JSON.stringify(docArr, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});

app.post('/locations/add', function(req, res) {
  if(!req.body || !req.body.name || !req.body.category || !req.body.location) {
    sendError(res, 'Validation error!');
    return;
  }

  const newLocation = {
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
  };

  req.mongoCollection.insert(newLocation, function(err, doc) {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.json(JSON.stringify('Successfully added')); 
    }
  })
});

app.listen(port, () => {
  if(global.client) {
    global.client.close();
  }
  console.log("The server is running on port %s", port);
});

process.on('exit', function() {
  if(global.client) {
    global.client.close();
  }
  console.log("Express is exiting on port %s", port);
});

function sendError(res, err, msg = 'This is an error!') {
  console.log(err);
  res.status(400).send({message: msg});
}