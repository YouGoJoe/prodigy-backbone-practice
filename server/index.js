const express = require('express');
const app = express();

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

app
    .get('/:id', function (request, response) {
        
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
});