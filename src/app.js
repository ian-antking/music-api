const express = require('express');
const queries = require('../queries');

const app = express();

app.use(express.json());

app.post('/artists', (req, res) => {
    queries.insert('Artists', req.body).then(results => res.send(results));
})

app.get('/artists', (req, res) => {
    queries.get('Artists', req.query).then(results => {res.send(results)});
})

app.get('/artists/:id', (req, res) => {
    const id = req.params.id
    queries.get('Artists', { id }).then(results => {res.send(results)});
})

module.exports = app;