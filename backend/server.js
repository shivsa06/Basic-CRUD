const connection = require ('./DBConnection');
const express = require ('express');
const cors = require ('cors');
const account = require ('./routes/Account');
const app = express ();
const PORT = 4567;

app.use (cors ());
app.use ('/uploads', express.static ('uploads')); //because we want upload should accessible outside application that is client

let authoriseToken = (req, res, next) => {
  console.log(req.headers["Authorization"]);
  next();
}

app.use(authoriseToken);

app.use ('/', account);

app.listen (PORT, () => {
  console.log (`Server running at Port: ${PORT}`);

});

// // Middleware for parsing body
// app.use (express.json ());