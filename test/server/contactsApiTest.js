var app = require("../../app.js").app;
var request = require('supertest');
var _ = require("underscore");
require("chai").should();

describe('GET /contacts', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/contacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        JSON.parse(res.text).should.have.length(2);
      	done();
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
