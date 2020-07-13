const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const database = require('../database')

describe('albums', () => {
    let artist;

    beforeEach(async () => {
        const id = await database('Artists')
            .insert({
                name: 'Tame Impala',
                genre: 'rock'
            })
        const [artistData] = await database('Artists')
            .where({id})
        artist = artistData
    })

    afterEach(async () => {
        await database('Albums')
            .where({})
            .del()
        await database('Artists')
            .where({})
            .del()
    })

    describe('POST /artists/:id/albums', () => {
        it('creates a new album for a given artist', async () => {
            const response = await request(app)
                .post(`/artists/${artist.id}/albums`)
                .send({
                    name: 'Inner Speaker',
                    year: '2010'
                })


            expect(response.status).to.equal(201);

            const [albumData] = await database('Albums').where({ id: response.body.id });
            expect(albumData.name).to.equal('Inner Speaker');
            expect(albumData.year).to.equal(2010);
            expect(albumData.artist_id).to.equal(artist.id);
        })

        it('returns a 404 and does not create and album if the artist does not exits', async () => {
            const response = await request(app)
                .post('/artists/12345689/albums')
                .send({
                    name: 'Inner Speaker',
                    year: 2010
                })

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('the artist could not be found');
        })
    })
})