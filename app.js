const express = require('express')
const dotenv=require("dotenv").config();
const path =require("path");
const app = express()
const port = process.argv[process.argv.length-1];
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render("index");
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})