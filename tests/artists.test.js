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
        it('creates a new artist in the datase', async () => {
            const response = await request(app).post('/artists').send({
                name: 'Tame Impala',
                genre: 'Rock',
              });
        
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal('Tame Impala');

            const [insertedArtistRecord] = await database('Artists');
            expect(insertedArtistRecord.name).to.equal('Tame Impala');
            expect(insertedArtistRecord.genre).to.equal('Rock');
        })

        describe('with artists in the databse', () => {
            let artists;
            beforeEach(async () => {
                await Promise.all([
                    database('Artists').insert({ name: 'Madonna', genre: 'pop' }),
                    database('Artists').insert({ name: 'Lady Gaga', genre: 'pop' }),
                    database('Artists').insert({ name: 'Kylie', genre: 'pop' }),
                ])
                artists = await database('Artists').where({});
            })

            describe('/GET /artists', () => {
                it('returns all artists', async () => {
                    const response = await request(app).get('/artists');

                    expect(response.status).to.equal(200);
                    expect(response.status).to.equal(200);

                    response.body.forEach(artist => {
                        const expected = artists.find(a => artist.id === a.id);
                        expect(expected.name).to.equal(artist.name);
                        expect(expected.genre).to.equal(artist.genre);
                    })
                })
            })

            describe('GET /artist/:id', () => {
                it('gets artist record by id', async () => {
                    const artist = artists[0];

                    const response = await request(app).get(`/artists/${artist.id}`);

                    expect(response.body.name).to.equal(artist.name);
                    expect(response.body.genre).to.equal(artist.genre);
                })

                it('returns a 404 if the artist does not exist', async () => {
                    const response = await request(app).get('/artists/12345');

                    expect(response.status).to.equal(404);
                    expect(response.body.error).to.equal('the artist could not be found');
                });
            })

            describe('PATCH /artists/:id', () => {
                it('updates artist record by id', async () => {
                    const artist = artists[0];
                    const response = await request(app).patch(`/artists/${artist.id}`).send({ genre: 'club' });

                    expect(response.body.genre).to.equal('club');
                })

                it('returns a 404 if the artist does not exist', async () => {
                    const response = await request(app).patch('/artists/12345').send({ genre: 'club' });

                    expect(response.status).to.equal(404);
                    expect(response.body.error).to.equal('the artist could not be found');
                });
            })

            describe('DELETE', () => {
                it('deletes artist by id', async () => {
                    const artist = artists[0];
                    const response = await request(app).delete(`/artists/${artist.id}`);

                    expect(response.status).to.equal(200);

                    const artistData = await database('Artists').where({ id: artist.id });
                    
                    expect(artistData).to.deep.equal([]);
                })

                it('returns a 404 if the artist does not exist', async () => {
                    const response = await request(app).delete('/artists/12345');

                    expect(response.status).to.equal(404);
                    expect(response.body.error).to.equal('the artist could not be found');
                });
            })
        })
    })
})
