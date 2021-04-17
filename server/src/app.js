const { join } = require('path');
const express = require('express');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');

app.set('port', process.env.PORT || 5000);

const middlewares = [
  express.json(),
  express.urlencoded({ extended: false }),
];

app.use(middlewares);

app.use(express.static(join(__dirname, '..', '..', 'client', 'build')));

app.use('/api/v1', router);

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

module.exports = app;
