const dotenv = require('dotenv');

dotenv.config(`.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`)
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

module.exports = {
  client: 'mysql2',
  connection: {
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME
  }
};
