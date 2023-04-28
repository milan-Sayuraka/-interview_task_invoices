const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
var cors = require('cors')

// create express app
const app = express();

console.log(`NODE_ENV=${config.NODE_ENV}`);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

var corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// Require Invoices routes
require('./app/routes/invoice.routes.js')(app);

app.get('/', (req, res) => {
  res.json({ "message": "Welcome to Invoice application" });
});

// listen for requests
app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});