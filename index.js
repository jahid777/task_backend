const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const inputCollection = client.db("taskData").collection("taskData_collection");

// INSERT INPUT DATA AT THE DATABASE
app.post("/addInputData", async (req, res) => {
  try {
    const data = await req.body;
    const result = await inputCollection.insertOne(data);
    res.send(result.acknowledged);
  } catch (error) {
    console.log("err", error);
  }
});

//get all product from collection
app.get("/getInputData", async (req, res) => {
  const result = await inputCollection.find({}).toArray();
  res.send(result);
});

// mongodb connected message
console.log("database connected");

// root url route
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app listening");
});
