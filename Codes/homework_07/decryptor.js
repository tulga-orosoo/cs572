const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01";

app.get('/secret', function(req, res) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {

    const collection = client.db("homework01").collection("data");
    collection.findOne({}, {projection: {key:1, message:1}}, function(err, doc) {
      if(err) {
        console.log(err);
        throw new Error(err)
      }
      res.status(200);
      res.set('Content-type', 'application/json');
      
      console.log(doc);
      if(doc) {
        doc.message = require('simple-encryptor')(doc.key).decrypt(doc.message);
        res.end(JSON.stringify(doc));  
      } else {
        res.end(JSON.stringify('No data found'));  
      }
      
      client.close();
    });
  });
});


app.listen(port, function() {
  console.log("The server is running on port %s", port);
})