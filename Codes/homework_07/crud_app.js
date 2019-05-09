const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const uri = "mongodb+srv://dbUser:myPassword@cluster0-b7azg.mongodb.net/test?retryWrites=true";

global.client = null;  

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true})); 

app.use(function (req, res, next) {
  function setCollectionAndNext() {
    req.mongoCollection  = global.client.db("homework07").collection("lectures");
        next();;
  }
  if(!global.client) {
    global.client = new MongoClient(uri, { useNewUrlParser: true });
    global.client.connect(err => {
      if(!err) {
        setCollectionAndNext();
      } else {
        sendError(res, 'MongoDB connection error!');
      }
    });
  } else {
    console.log('Already has mongo connection');
    setCollectionAndNext();
  }
});

app.get('/lectures', function(req, res) {
  const cursor = req.mongoCollection.find();
  cursor.toArray(function(err, docArray) {
    if(err) {
      sendError(res)
    } else {
      res.status(200);
      res.set('Content-type', 'application/json');
      if(docArray.length) {
        res.end(JSON.stringify(docArray));  
      } else {
        res.end(JSON.stringify('No data found'));  
      }
    }
    
  });
});

app.post('/lectures/add', function(req, res) {
  if(!req.body || !req.body.course || !req.body.lecture) {
    sendError(res)
    return;
  }

  const newLecture = {
    course: req.body.course, 
    lecture: req.body.lecture
  };

  req.mongoCollection.insert(newLecture, function(err, doc) {
    if(err) {
      sendError(res)
    } else {
      res.status(200);
      res.set('Content-type', 'application/json');
      res.json(JSON.stringify('Successfully added'));  
    }
  });
});

app.get('/lectures/:lectureId', function (req, res) {
  if(!req.params.lectureId) {
    return sendError(res);
  }

  req.mongoCollection.findOne({_id: ObjectId(req.params.lectureId)}, function(err, doc) {
    if(err) {
      sendError(res);
    } else {
      if(!doc) {
        return sendError(res, 'No lecture is found!');
      }
      res.status(200);
      res.json(doc);  
    }
  });
})

app.delete('/lectures/:lectureId', function (req, res) {
  if(!req.params.lectureId) {
    return sendError(res);
  }

  req.mongoCollection.deleteOne({_id: ObjectId(req.params.lectureId)}, function(err, doc) {
    if(err) {
      sendError(res);
    } else {
      if(!doc) {
        return sendError(res, 'No lecture is found!');
      }
      res.status(200);
      res.json('Lecture is deleted!');  
    }
  });
})

app.put('/lectures/:lectureId', function(req, res) {
  if(!req.params.lectureId) {
    return sendError(res);
  }

  if(!req.body || !req.body.course || !req.body.lecture) {
    return sendError(res);
  }

  const newValues = { $set: {
    course: req.body.course, 
    lecture: req.body.lecture
  }};

  req.mongoCollection.updateOne({_id: ObjectId(req.params.lectureId)}, newValues, function(err, doc) {
    if(err) {
      console.log(err);
      sendError(res);
    } else {
      res.status(200);
      res.set('Content-type', 'application/json');
      res.json(JSON.stringify('Successfully updated'));  
    }
  });
});

app.post('/search/:q', function (req, res) {
  if(!req.params.q) {
    return sendError(res, 'Search key required as param q');
  }

  req.mongoCollection.find({course: req.params.q}).toArray(function(err, docArray) {
    if(err) {
      sendError(res);
    } else {
      res.status(200);
      res.set('Content-type', 'application/json');
      if(docArray.length) {
        res.end(JSON.stringify(docArray));  
      } else {
        res.end(JSON.stringify('No data found'));  
      }
    }
  });
})


app.listen(port, function() {
  console.log("The server is running on port %s", port);
});

process.on('exit', function() {
  console.log("Express is exiting on port %s", port);
});

function sendError(res, msg = 'This is an error!') {
  res.status(400).send({
    message: msg
  });
}