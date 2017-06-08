let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let routes = require('../index');

const server = 'http://localhost:8000';

chai.use(chaiHttp);

describe('Todos', function () {

    // Clear the DB
    before(function () {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                let todos = res.body || [];
                todos.forEach(function (todo) {
                    chai.request(server).delete('/' + todo.id).end(function (err, res) { });
                }, this);
            });
    });

    describe('GET all Todos', function () {
        it('it should get all the Todos', function () {
            chai.request(server)
                .get('/')
                .end(function (err, res) {
                    expect(res.status).to.be(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be(0);
                });
        });
    });

    describe('POST Create a Todo', function () {
        it('it should create a Todo', function () {
            let todo = { description: 'Testing todo', isComplete: false };

            chai.request(server)
                .post('/')
                .send(todo)
                .end(function (err, res) {
                    expect(res.status).to.be(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('description');
                    expect(res.body.description).to.equal('Testing todo');
                    expect(res.body).to.have.property('isComplete');
                    expect(res.body.description).to.be.false;
                    expect(res.body).to.have.property('id');
                    expect(res.body.id).to.be.a('number');
                });
        });
    });

    describe('GET a Todo', function () {
        it('it should get a Todo', function () {

            let todo = { description: 'Testing todo', isComplete: false };

            chai.request(server)
                .post('/')
                .send(todo)
                .end(function (error, result) {
                    chai.request(server)
                        .get('/' + result.body.id)
                        .end(function (err, res) {
                            expect(res.status).to.be(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('description');
                            expect(res.body.description).to.equal('Testing todo');
                            expect(res.body).to.have.property('isComplete');
                            expect(res.body.description).to.be.false;
                            expect(res.body).to.have.property('id');
                            expect(res.body.id).to.equal(result.body.id);
                        });
                });
        });

        it('it shoud error on an ID that does not exist', function () {
            chai.request(server)
                .get('/Boris')
                .end(function (err, res) {
                    expect(res.status).to.be(400);
                    expect(res.body).to.be.a('string');
                    expect(res.body).to.equal('Todo Boris not found.');
                });
        });
    });

    describe('PUT a Todo', function () {
        it('it should update a Todo', function () {

            let todo = { description: 'Testing todo', isComplete: false };

            chai.request(server)
                .post('/')
                .send(todo)
                .end(function (error, result) {

                    let updateTodo = Object.assign({}, result.body);
                    updateTodo.description = 'My new description';

                    chai.request(server)
                        .put('/' + updateTodo.id)
                        .send(updateTodo)
                        .end(function (err, res) {
                            expect(res.status).to.be(200);
                            expect(res.body).to.be.a('object');
                            expect(res.body).to.have.property('description');
                            expect(res.body.description).to.equal('My new description');
                            expect(res.body).to.have.property('isComplete');
                            expect(res.body.description).to.be.false;
                            expect(res.body).to.have.property('id');
                            expect(res.body.id).to.equal(result.body.id);
                        });
                });
        });

        it('it shoud error on an ID that does not exist', function () {
            chai.request(server)
                .put('/Boris')
                .end(function (err, res) {
                    expect(res.status).to.be(400);
                    expect(res.body).to.be.a('string');
                    expect(res.body).to.equal('Todo Boris not found.');
                });
        });
    });
});