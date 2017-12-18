let mongoose = require("mongoose");
let User = require('../src/server/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    /*
     * Test the /GET route
     */
    describe('/GET user favourites', () => {
        it('it should not allow an unauthenticated user to access user favourites', (done) => {
            chai.request(server)
                .get('/api/users/auth0|5a305a94bc13300e03054a6b/favourites')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST user data', () => {
        it('it should not allow an unauthenticated user to add user data to DB via API', (done) => {
            chai.request(server)
                .post('/api/users/')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('it should not allow an unauthenticated user to add a favourite recipe to the DB', (done) => {
            chai.request(server)
                .post('/api/users/auth0|5a305a94bc13300e03054a6b/favourites/5a2f150d734d1d29323545f9')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        })
    });

    /*
     * Test the /DELETE route
     */
    describe('/DELETE user favourites', () => {
        it('it should not allow an unauthenticated user to delete user favourites', (done) => {
            chai.request(server)
                .delete('/api/users/auth0|5a305a94bc13300e03054a6b/favourites/5a2f150d734d1d29323545f9')
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});