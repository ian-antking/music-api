const ENV = process.env.NODE_ENV || 'development'

const connection = {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'music_library'
    }
  }
const database = require('knex')(connection)

module.exports = database
