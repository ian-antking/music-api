const express = require('express');
const {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
} = require('../controllers/artist');
const {
    createAlbum
} = require ('../controllers/albums');

const router = express.Router()

router.route('/')
    .post(createArtist)
    .get(getArtists);

router.route('/:id')
    .get(getArtistById)
    .patch(updateArtist)
    .delete(deleteArtist)

router.route('/:id/albums')
    .post(createAlbum)

module.exports = router;
