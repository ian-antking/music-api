const { expect } = require('chai');
const request = require('supertest');
const database = require('../database');
const app = require('../src/app');

describe('artists', () => {
    after(() => {
        database.destroy()
    })

    describe('POST /artists', () => {
        it('creates a new artist in the dataase', (done) => {
            request(app)
                .post('/artists')
                .send({
                    name: 'Tame Impala',
                    genre: 'rock'
                })
                .then(response => {
                    expect(response.status).to.equal(201);
                    done();
                })
        })
    })
})
