const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:myPassword@cluster0-b7azg.mongodb.net/test?retryWrites=true";
const port = 3000;
global.client = null;

app.use(function(req, res, next) {
  function setCollectionAndNext() {
    req.mongoCollection = global.client.db('homework09').collection('zipcodes1');
    next();
  }
  if(!global.client) {
    global.client = new MongoClient(uri, {useNewUrlParser: true});
    global.client.connect(err => {
      if(err) {
        sendError(res, err);
      } else {
        setCollectionAndNext();
      }
    })
  } else {
    console.log("Mongo has already a connection");
    setCollectionAndNext();
  }
});

app.get('/zipcodes/task1', function(req, res) {
  req.mongoCollection.aggregate([
    {$match: {state: 'WA'}}
  ]).toArray((err, docArray) => {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Total documents: '+docArray.length+'</strong> <br><br> <div><strong>JSON Data:</strong><br><br><pre><code>'+JSON.stringify(docArray, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});

app.get('/zipcodes/task2', function(req, res) {
  req.mongoCollection.aggregate([
    {$match: {pop: {$lt : 5000}}}
  ]).toArray((err, docArray) => {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Total documents: '+docArray.length+'</strong> <br><br> <div><strong>JSON Data:</strong><br><br><pre><code>'+JSON.stringify(docArray, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});

app.get('/zipcodes/task3', function(req, res) {
  req.mongoCollection.aggregate([
    {$group: {
      _id: {'state':'$state', 'city':'$city'},
      count: {$sum: 1},
    }},
    {$match: {count: {$gt : 1}}},
    {$project: {_id:0, 'state':'$_id.state','city':'$_id.city', count:1}},
    {$sort: {'state': 1, 'city': 1}}
  ]).toArray((err, docArray) => {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Total documents: '+docArray.length+'</strong> <br><br> <div><strong>JSON Data:</strong><br><br><pre><code>'+JSON.stringify(docArray, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});

app.get('/zipcodes/task4', function(req, res) {
  req.mongoCollection.aggregate([
    {$group: {
      _id: {'state':'$state', 'city':'$city'},
      pop: {$sum: '$pop'},
    }},
    {$sort: {'_id.state':1, 'pop':1}},
    {$group: {
      _id: '$_id.state',
      city: {$first: '$_id.city'},
      pop: {$first: '$pop'},
    }},
    {$project: {_id:0, 'state':'$_id','city':1, pop:1}},
    {$sort: {state:1}}
    
  ]).toArray((err, docArray) => {
    if(err) {
      sendError(res, err);
    } else {
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Total documents: '+docArray.length+'</strong> <br><br> <div><strong>JSON Data:</strong><br><br><pre><code>'+JSON.stringify(docArray, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});

app.listen(port, function() {console.log('The server is running on port %s', port)});

function sendError(res, err, msg = 'This is an error') {
  console.log(err);
  res.status(400).send({message: msg});
}