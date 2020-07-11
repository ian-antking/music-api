const ENV = process.env.NODE_ENV || 'development'

const connection = require('../knexfile')[ENV]
const database = require('knex')(connection)

module.exports = {
    get(table, query){
        return database(table)
            .where(query)
    },
    insert(table, data){
        return database(table)
            .insert(data)
    }
}