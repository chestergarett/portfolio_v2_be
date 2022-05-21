require('dotenv').config()
const functions = require('@google-cloud/functions-framework');
const express = require('express');
const cors = require('cors');
const winston = require('winston');
const app = express();

app.use(express.json());
app.use(cors())
require('./startup/routes')(app);
functions.http("portfolioFunctions", app)

// const port = process.env.PORT || 3000;
app.listen(8080, ()=> winston.info(`Listening on port 8080`))

module.exports = { app }