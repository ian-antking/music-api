const database = require('../../database');

exports.createAlbum = (req, res) => {
    const data = req.body
    data.artist_id = req.params.id
    database('Albums')
        .insert(data)
        .then(albumId => {
            database('Albums')
                // How to join Artist onto Album table:
                // .select([
                //     'Artists.name as artist_name',
                //     'Albums.artist_id',
                //     'Albums.name',
                //     'Albums.year',
                //     'Albums.id',
                // ])
                // .from('Albums')
                // .join('Artists', 'Artists.id', 'Albums.artist_id')
                .where({'Albums.id': albumId})
                .then(([data]) => res.status(201).send(data));
        })
        .catch(e => {
            switch(e.errno) {
                case 1452:
                    res.status(404).send({ error: 'the artist could not be found' })
                    break;
                default:
                    res.status(500).send({ error: e.sqlMessage });
            }
        }); 
}