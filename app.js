const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv/config');

const userroute = require("./routes/users");
app.use(express.json());
app.use('/users',userroute);
//middleware
app.get("/", (req, res) => {
  res.send("<p> you are on localhost</p><p>add /users endpoint for user profile options</p>");
});
//connect to db
mongoose.connect(process.env.db,()=>console.log("connected to db!"));

const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on port ${port} 🔥`);