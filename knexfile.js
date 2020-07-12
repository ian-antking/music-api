const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'music_library'
    }
  },
  test: {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'password',
      database : 'music_library_test'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host : DB_HOST,
      user : DB_USER,
      password : DB_PASSWORD,
      database : DB_NAME
    }
  },
};
