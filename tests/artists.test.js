const { expect } = require('chai');
const request = require('supertest');
const database = require('../database');
const app = require('../src/app');

describe('artists', () => {
    after(() => {
        database.destroy()
    })

    afterEach(async () => {
        await database('Artists')
            .where({})
            .del()
    })

    describe('POST /artists', () => {
        it('creates a new artist in the dataase', async () => {
            const response = await request(app).post('/artists').send({
                name: 'Tame Impala',
                genre: 'Rock',
              });
        
            await expect(response.status).to.equal(201);
            await expect(response.body.name).to.equal('Tame Impala');

            const [insertedArtistRecord] = await database('Artists');
            await expect(insertedArtistRecord.name).to.equal('Tame Impala');
            await expect(insertedArtistRecord.genre).to.equal('Rock');
        })
    })
})
