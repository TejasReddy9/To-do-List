var bodyParser = require('body-parser');
// var data =[{item: 'get milk'},{item: 'walk dog'},{item: 'do code'}]
var urlEncodedParser = bodyParser.urlencoded({extended : false});
var mongoose = require('mongoose');


mongoose.connect('mongodb://test:test@ds121192.mlab.com:21192/todolist');

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var item1 = Todo({item: 'Buy flowers'}).save(function(err){
// 	if(err) throw err;
// 	console.log('Item saved in database!');
// });

module.exports = function(app){
	app.get('/todo', function(req, res){
		// res.render('todo', {todos: data});
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos : data});
		});
	});

	app.post('/todo', urlEncodedParser, function(req, res){
		// data.push(req.body);
		// res.json(data);
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		// data = data.filter(function(todo){
		// 	return todo.item.replace(/ /g, '-') !== req.params.item;
		// });
		// res.json(data);
		Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

};