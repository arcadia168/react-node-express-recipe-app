let mongoose = require("mongoose");
let Recipe = require('../src/server/models/recipe');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Recipes', () => {
/*
  * Test the /GET route
  */
  describe('/GET recipes', () => {
      it('it should GET all the recipes', (done) => {
        chai.request(server)
            .get('/api/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
              done();
            });
      });
  });

  /*
  * Test the /GET route for a specific recipe
  */
  describe('/GET a particular recipe using a given ID', () => {
    it('it should GET the the recipe with the specified ID', (done) => {
      chai.request(server)
          .get('/api/recipe/5a2f150d734d1d29323545f9')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body.should.have.property('name');
              res.body.should.have.property('cookingTime');
              res.body.should.have.property('image');
            done();
          });
    });
});

});