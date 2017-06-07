const express = require('express');
const app = express();

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parse body params
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up LocalStorage
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

app
    .get('/', function (request, response) {
        let allTodos = [];
        localStorage._keys.forEach(function (todoKey) {
            let todo = localStorage.getItem(todoKey);
            if (todo) {
                allTodos.push(JSON.parse(todo));
            }
        }, this);

        response.send(allTodos);
    })
    .get('/:id', function (request, response) {
        let key = 'Todo-' + request.params.id;

        let result = localStorage.getItem(key);
        if (result) {
            response.send(JSON.parse(result));
        } else {
            response.status(400).send("Todo " + request.params.id + " not found.");
        }
    })
    .post('/', function (request, response) {

        // Manually generate unique ID
        let id = localStorage.length + 1
        let key = 'Todo-' + id;
        let result = localStorage.getItem(key);
        while (result) {
            id = id + 1;
            key = 'Todo-' + id;
            result = localStorage.getItem(key);
        }

        let todo = Object.assign({}, request.body);
        todo.id = id;

        localStorage.setItem(key, JSON.stringify(todo));
        response.send(todo);
    })
    .put('/:id', function (request, response) {
        let key = 'Todo-' + request.params.id;
        let result = localStorage.getItem(key);
        if (result) {
            localStorage.setItem(key, JSON.stringify(request.body));
            response.send(request.body);
        } else {
            response.status(400).send("Todo " + request.params.id + " not found.");
        }
    })
    .delete('/:id', function (request, response) {
        let key = 'Todo-' + request.params.id;
        localStorage.removeItem(key);
        response.status(200).send();
    });

// Start the server

app.listen(8000, function () {
    console.log('server up');
});