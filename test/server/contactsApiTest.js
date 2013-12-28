var request = require('supertest');
var _ = require("underscore");
require("chai").should();

var app;

describe('GET /contacts', function(){
  before(function(done) {
    // var connection = 'mongodb://127.0.0.1:27017/test'
    var connection = "mysql://monty:some_pass@localhost:3306/addressbook?reconnect=true";

    require("../../app.js").start(connection, function(_app) {
      app = _app;
      done();
    });
  });

  it('respond with json', function(done){
    request(app)
      .del('/api/contacts')
      .expect(200)
      .end(function(err, res) { 
        request(app)
          .get('/api/contacts')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            JSON.parse(res.text).should.have.length(0);
          	done();
          });
        });
  });

  it("returns saved contacts", function(done) {
    var newContact = {firstName: "mr " + Math.random() };

    request(app)
      .post("/api/contacts")
      .send(newContact)
      .expect(200)
      .end(function(err, res) {
            request(app).get("/api/contacts")
              .expect(200)
              .end(function(err, res) {
                var firstNames = _.collect(JSON.parse(res.text), function(c) { return c.firstName });
                firstNames.should.include(newContact.firstName);
                done();
              });
      });

  });


})
