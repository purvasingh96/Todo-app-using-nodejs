var express = require('express');
var todoController = require('./controllers/todoController.js')

var app = express();	//set up app using express

//set up template engine
app.set('view engine', 'ejs');	//going to use ejs for template

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);	//available to us in todoController.js

//listen to port
app.listen(3000);
console.log('you are listening to port 3000');