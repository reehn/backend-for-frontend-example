"use strict";

const express = require('express');
const logger = require('morgan');

const homeRouter = require('./routes/index');
const creditCardRouter = require('./routes/creditCard');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', homeRouter);
app.use('/creditcard', creditCardRouter);

// error handler
app.use(function(err, req, res, next) {

  const message = err.message;
  
  const status = err.status || 500;
  const error = {
    status,
    title: status === 500 ? "server error" : err.title,
    detail: message,
    source: req.originalUrl
  }

  res.status(status).json(error)
});

module.exports = app;
