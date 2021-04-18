const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const httpContext = require('express-http-context');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = express.Router();

app.use(httpContext.middleware);

require('./server/routes')(apiRouter);
app.use((req, res, next) => {
  httpContext.set('user', 'edkvm');
  next();
});

app.use('/api', apiRouter);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
