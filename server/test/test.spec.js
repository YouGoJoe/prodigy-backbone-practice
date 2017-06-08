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
                })
        })
    })
});