const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port =process.env.PORT || 5055;
app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajnzz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("maleFashionStore").collection("products");
  const orderCollection = client.db("maleFashionStore").collection("orders");


    app.post('/addProduct', (req, res) => {
      const pd = req.body;
      productCollection.insertOne(pd)
      .then( result => {
        res.send(result.acknowledged == true)
      })
    })

    app.get('/products', (req, res) => {
      productCollection.find({})
      .toArray( (err, documents) => {
        res.send(documents)
      })
    })
    
});

 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)