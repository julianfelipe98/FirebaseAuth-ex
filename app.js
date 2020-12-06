const express = require('express')
const dotenv=require("dotenv").config();
const path =require("path");
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.render("index");
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})