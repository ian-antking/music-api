const express = require('express');
const database = require('../database');
const { where } = require('../database');

const app = express();

app.use(express.json());

app.post('/artists', (req, res) => {
    database('Artists')
        .insert(req.body)
        .then((id) => {
            database('Artists')
                .where({id})
                .then((user) => res.status(201).send(user));
        })
        .catch(error => res.status(500).send(error));
})

app.get('/artists', (req, res) => {
    database('Artists')
        .where(req.query)
        .then((artists) => res.status(200).send(artists))
        .catch(error => res.status(500).send(error));
})

app.get('/artists/:id', (req, res) => {
    const {id} = req.params;
    database('Artists')
        .where({id})
        .then((artists) => res.status(200).send(artists))
        .catch(error => res.status(500).send(error));
})

app.patch('/artists/:id', (req, res) => {
    const {id} = req.params
    database('Artists')
        .where({id})
        .update(req.body)
        .then(() => {
            database('Artists')
                .where({id})
                .then(newArtist => res.status(200).send(newArtist))
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
})

app.delete('/artists/:id', (req, res) => {
    const {id} = req.params
    database('Artists')
        .where({id})
        .del()
        .then(() => res.sendStatus(200))
        .catch(error => res.status(500).send(error));
})

module.exports = app;