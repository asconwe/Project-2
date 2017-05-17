//============== Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
//==============Local dependencies
var db = require("./models");
var controller = require('./controllers/controller') // Name controllers accordingly

//============== Name our server
var app = express();

//============== Set our views engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//============== Make files publicly available
app.use(express.static(__dirname + "/public"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

//============== Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));

controller(app);

//============== Set PORT
var PORT = process.env.PORT || 3000;

//============== Sync database and start server
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});