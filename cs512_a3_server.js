var mysql = require('mysql');
var mkdirp = require("mkdirp");
var getDirName = require("path").dirname;
var fileservices = require('fs');
var express = require('express')
  , passport = require('passport')
  , util = require('util')



var pool = mysql.createPool({
  host     : '192.81.129.111',
  user     : 'root',
  port     :  3306,
  password : 'fitbit1111',
  database : 'stepGoalie_prod'
  //moves_prod
});
var baseURI = "https://api.moves-app.com/api/v1"
var token_;
var token_secret;
var one_day = 1000*60*60*24;

var app = express.createServer();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname))
  app.use(express.static(__dirname + "/../files/html"));
  //app.use(express.static(__dirname + '/public'));
});


app.get('/index.html', function(req, res){
  res.sendfile(require('path').resolve(__dirname + "/index.html"));
});

/*
app.post('/index.html', function(req, res){
	command = req.body["command"]
	console.log('command',command);
	args = JSON.parse(req.body["args"])
	if(command == "getUserId"){
		console.log('req.session.user_id',req.session.user_id)
		res.send(JSON.stringify({'user_id':req.session.user_id}));
	}
});
*/

/*
function writeToFile(userId,json,year,month,day){
    var fileContents = JSON.stringify(json)
    var fileName = "moves-"+ year+""+month+""+day+".js"
    
    console.log(fileName);
    
    var filePath = '../files/moves-logs-prod/'+userId+"/"+fileName;
    mkdirp(getDirName(filePath), function (err) {
    	if (err) console.log(err)
    
	    fileservices.writeFile(filePath, fileContents, function(err) {
	        if(err) {
	            console.log(err);
	        } else {
	            console.log("The file was saved!");
	        }
	    }); 
	})
}
*/

console.log('listening at http://localhost:9517/');
app.listen(9517);
