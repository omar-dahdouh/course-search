const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const router = require('./router');
const app = express();

app.disabled('x-powered-by');
app.set('port', process.env.PORT || 5000);

const publicPath = join(__dirname, '..', '..', 'client', 'build');
const indexPath = join(__dirname, '..', '..', 'client', 'build', 'index.html');

const middlewares = [
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
  express.static(publicPath)
];

app.use(middlewares);
app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

module.exports = app;
