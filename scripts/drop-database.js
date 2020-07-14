const dotenv = require('dotenv');
const path = require('path');

const envFile = '../.env.test';

dotenv.config({
    path: path.join(__dirname, envFile),
  });

const database = require('../database');

const setupDatabase = async () => {
    await database.migrate.latest();
    await database.raw(`DROP DATABASE ${process.env.DB_NAME}`)
    database.destroy()
} 

setupDatabase()