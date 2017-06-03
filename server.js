//============== Dependencies
require('dotenv').config({path: './.env'});
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
//==============Local dependencies
var db = require("./models");
var controller = require('./controllers/controller')
var dummy = require('./dummyData');

//============== Name our server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//============== Set our views engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//============== Make files publicly available
app.use(express.static(__dirname + "/public"));
app.use('/socket.io',express.static(__dirname +'/node_modules/socket.io-client/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

//============== Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));

//============== Start all controllers
// console.log('server.js', app);
controller(app);

//============== Set PORT
var PORT = process.env.PORT || 3000;
//server.listen(process.env.PORT || 3000);

//============== Sync database and start server
db.sequelize.sync({ force: true }).then(function() {
	server.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
		dummy();

	});
//Two Arrays
users = [];
connection = [];

//Create a route. Takes in req and res.
app.get('/chat', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){

//takes in array connection array
connection.push(socket);
console.log('connectioned: %s sockets connectioned', connection.length);


// Disconnect
//Purpose: want to tell us when someone disconnects we want it to tell us how many are still connected
socket.on('disconnect', function(data){
users.splice(users.indexOf(socket.username), 1);
updateUsernames();
connection.splice(connection.indexOf(socket) , 1);
console.log('Disconnected: %s sockets connected', connection.length);

});

//Send Message
socket.on('send message', function(data){
console.log(data);
io.sockets.emit('new message', {msg: data, user: socket.username});
	});
//New User
socket.on('new user', function(data, callback){
console.log(data);
callback(true);
socket.username = data;
users.push(socket.username);
updateUsernames();
	});

	function updateUsernames(){
		io.sockets.emit('get users', users);

		}

	});
});