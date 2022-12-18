const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
var bodyParser = require("body-parser");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vr8ajn5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const bookCollection = client.db("organicdb").collection("books");

  //   end the collection
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port);
app.listen(port, () => console.log(`connected database server${port}`));
