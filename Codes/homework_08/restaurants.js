const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:myPassword@cluster0-b7azg.mongodb.net/test?retryWrites=true";

global.client = null;
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  function setCollectionAndNext() {
    req.mongoCollection = global.client.db('homework08').collection('restaurants');
    next();
  }

  if(!global.client) {
    global.client = new MongoClient(uri, {useNewUrlParser: true});
    global.client.connect(err => {
      if(err) {
        console.log(err);
        sendError(res, "MongoDB connection error");
      } else {
        setCollectionAndNext();
      }
    })
  } else {
    console.log('Already has mongo connection');
    setCollectionAndNext();
  }
});

app.get('/restaurants/:questionNumber', function(req, res) {
  let query = {};
  let projection = {};
  let option = {};
  console.log("Question number: " + req.params.questionNumber);
  switch(req.params.questionNumber) {
    case '1': break;
    case '2': 
      projection = {restaurant_id:1, name:1, district:1, cuisine:1}; 
      break;
    case '3': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1}; 
      break;
    case '4': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, 'address.zipcode':1};
      break;
    case '5': 
      projection = {_id:0, restaurant_id:1, name:1};
      query = {district:'Bronx'};
      break;
    case '6': 
      // projection = {_id:0, restaurant_id:1, name:1};
      query = {district:'Bronx'};
      option = {limit: 5};
      break;
    case '7': 
      query = {district:'Bronx'};
      option = {limit: 5, skip: 5};
      break;
    case '8': 
      query = {'address.coord.0': {$lt: -95.754168}};
      break;
    case '9': 
      query = {'cuisine': {$ne: 'American '}, grades: {$elemMatch: {score: {$gt: 70}}}, 'address.coord.0': {$lt: -65.754168}};
      break;
    case '10': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1};
      query = {name: {$regex: /^Wil/}};
      break;
    case '11': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1};
      query = {name: {$regex: /ces$/}};
      break;
    case '12': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1};
      query = {name: {$regex: /Reg/}};
      break;
    case '13': 
      query = {district:'Bronx', cuisine: {$in: ['American ', 'Chinese']}};
      break;
    case '14': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1};
      query = {district: {$in: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}};
      break;
    case '15': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1};
      query = {district: {$nin: ['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}};
      break;
    case '16': 
      projection = {_id:0, restaurant_id:1, name:1, district:1, cuisine:1, grades:1};
      query = {grades: {$not: {$elemMatch: {score: {$gt: 10}}}}};
      break;
    case '17': 
      projection = {_id:0, restaurant_id:1, name:1, address:1};
      query = {'address.coord.1': {$gt: 42, $lt: 53}};
      break;
    case '18': 
      projection = {_id:0, name:1};
      option = {sort: {name: 1}};
      break;
    case '19': 
      projection = {_id:0, name:1};
      option = {sort: {name: -1}};
      break;
    case '20': 
      projection = {_id:0, cuisine:1, district: 1};
      option = {sort: {cuisine: 1, district:-1}};
      break;
    case '21': 
      projection = {_id:0, name:1, address: 1};
      query = {'address.coord': {$type: "double"}};
      break;
    case '22': 
      projection = {_id:0, name:1, district: 1, 'address.coord':1};
      query = {name: /^Mad/};
      break;
    default: break;
  }


  req.mongoCollection.find(query, option).project(projection).toArray((err, docArray) => {
    if(err) {
      console.log(err);
      sendError(res);
    } else {
      console.log('Query result count: ' + docArray.length);
      res.status(200);
      res.set('Content-Type', 'text/html');
      res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>title</title><link rel="icon" href="data:,"></head><body><strong>Total documents: '+docArray.length+'</strong> <br><br> <div><strong>JSON Data:</strong><br><br><pre><code>'+JSON.stringify(docArray, null, 2)+'</code></pre></div></body></html>')
      res.end();
    }
  })
});




app.listen(port, function() {
  console.log("The server is running on port %s", port);
});

process.on('exit', function() {
  if(global.client) {
    global.client.close();
  }
  console.log("Express is exiting on port %s", port);
});

function sendError(res, msg = 'This is an error!') {
  res.status(400).send({message: msg});
}


//client.db('homework07_library').collection('books').createIndex( { keywords: 1 } )
//client.db('homework07_library').collection('books').createIndex( { borrows.status: 1 } )