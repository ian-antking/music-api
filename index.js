const app = require('./src/app');

const APP_PORT = process.env.PORT || 3000;

app.listen(APP_PORT, () => {
  console.log(`App now serving at http://localhost:${APP_PORT}`); // eslint-disable-line
});