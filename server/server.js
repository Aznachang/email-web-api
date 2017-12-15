/** Basic ExpressJS Settings **/
const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3000;

/** Other NPM Libraries **/
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const cors = require('cors');

// allow cors across all routes
app.use(cors());

/** Body-Parser **/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Express-Handlebars **/
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/** Serve Static-Files **/
const emailFormPath = path.join(__dirname, '../views');
app.use('/', express.static(emailFormPath));

app.get('/', (req,res) =>{
  res.render('email');
});

/** Import Specific Routes - 'Routes Folder **/
let routes = require('./routes/emailRoutes.js');
routes(app);

// Server Start
app.listen(port);
console.log('Email Web API server started on: ' + port);
