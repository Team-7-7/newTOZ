const express = require ("express");
const ViteExpress = require("vite-express");
const morgan = require('morgan');
require("dotenv").config();
const app = express();

//MIDDLEWARE//
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 'verify' function via util.js checks for valid token. Import with: const verify = require('../util') 

//API ROUTES//
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

//SERVER//
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
