const dotenv = require('dotenv');
const path = require('path');

const args = process.argv.slice(2)[0];

const envFile = args === 'test' ? '../.env.test' : '../.env';

dotenv.config({
    path: path.join(__dirname, envFile),
  });

const {DB_NAME} = process.env;

const config = require('../knexfile')[process.env.NODE_ENV || 'production']
config.connection.database = null;

const database = require('knex')(config);

const setupDatabase = async () => {
    await database.raw(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
    await database.raw(`USE ${DB_NAME}`);
    await database.migrate.latest();
    database.destroy();
} 

setupDatabase()