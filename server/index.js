const express = require('express');
const app = express();

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
        }
        else {
            response.status(400).send("Todo " + request.params.id + " not found.");
        }
    })
    .post('/', function (request, response) {

    })
    .put('/:id', function (request, response) {

    })
    .delete('/:id', function (request, response) {

    });

// Start  the server

app.listen(8000, function () {
    console.log('server up');

    localStorage.setItem('Todo-2', JSON.stringify({ foo2: "bar2" }));
});