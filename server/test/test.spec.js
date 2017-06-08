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
                .end(function(err, res){
                    expect(res.status).to.be(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('description');
                    expect(res.body.description).to.equal('Testing todo');
                    expect(res.body).to.have.property('isComplete');
                    expect(res.body.description).to.be.false;
                    expect(res.body).to.have.property('id');
                    expect(res.body.description).to.equal(1); // Since we flush the DB prior to the tests we can be sure this will be true
                });
        });
    });
});