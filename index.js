var express = require('express'); 
var todoController = require(__dirname + '/public/js/todoController');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.listen(8000);
console.log('Listening to port 8000');

todoController(app);
