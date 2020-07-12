const database = require('../../database');

exports.createArtist = (req, res) => {
    database('Artists')
        .insert(req.body)
        .then((id) => {
            database('Artists')
                .where({id})
                .then(([user]) => res.status(201).send(user));
        })
        .catch(error => res.status(500).send(error));
}

exports.getArtists = (req, res) => {
    database('Artists')
        .where(req.query)
        .then((artists) => res.status(200).send(artists))
        .catch(error => res.status(500).send(error));
}

exports.getArtistById = (req, res) => {
    const {id} = req.params;
    database('Artists')
        .where({id})
        .then(([artist]) => {
            if (!artist) {
                res.status(404).send({ error: 'the artist could not be found' })
            } else {
                res.status(200).send(artist)
            }
        })
        .catch(error => res.status(500).send(error));
}

exports.updateArtist = (req, res) => {
    const {id} = req.params
    database('Artists')
        .where({id})
        .update(req.body)
        .then(() => {
            database('Artists')
                .where({id})
                .then(([newArtist]) => {
                    if (!newArtist) {
                        res.status(404).send({ error: 'the artist could not be found' })
                    } else {
                        res.status(200).send(newArtist)
                    }
                })
                .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error));
}

exports.deleteArtist = (req, res) => {
    const {id} = req.params
    database('Artists')
        .where({id})
        .del()
        .then(recordsDeleted => {
            if (!recordsDeleted) {
                res.status(404).send({ error: 'the artist could not be found' })
            } else {
                res.sendStatus(200)
            }
        })
        .catch(error => res.status(500).send(error));
}

