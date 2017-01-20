var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds117909.mlab.com:17909/todolistnodejs');

//create a schema - like a blueprint for data
//to know what kind of info is saved in db
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);	//Todo is a model in collections of mondoDb 
var itemOne = Todo({item: 'buy flowers'}).save(function(err){	//saving data to db
	if (err) throw err;
	console.log('item saved');
});

//var data =[{item: 'get milk'}, {item:'walk dog'}, {item: 'play'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
	
	app.get('/todo', function(req, res){
		//get data from mongo db and pass it to view
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos:data});
		});	//to find all the items and store in db
		
	});

	app.post('/todo',urlencodedParser, function(req, res){
		//get data from view and add to mongodb
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);	//sending data back to view
		})
		});

	app.delete('/todo/:item', function(req, res){
		//delete requested item from mongoDb
		Todo.find({item: req.params.item.replace(/\-/, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});
}