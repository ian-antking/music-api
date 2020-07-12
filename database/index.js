const connection = require('../knexfile')
const database = require('knex')(connection)

module.exports = database
