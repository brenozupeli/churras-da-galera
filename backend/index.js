'use strict';
require('dotenv').config({ silent: true });

const port = process.env.PORT;

const express = require('express');
const app = require('express')();
const passport = require('passport');
const cors = require('cors');
const database = require('./src/database');

app.use(express.json());

app.disable('x-powered-by');
app.use(
  cors({
    exposedHeaders: ['Authorization']
  })
);

database.connect();

require('./src/middlewares/auth')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./src/routes'));

app.listen(port, () =>
  console.log('Server running! Port', port)
);
