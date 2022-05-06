require('dotenv').config()
const express = require('express');
const cors = require('cors');
const winston = require('winston');
const app = express();

app.use(express.json());
app.use(cors())
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, ()=> winston.info(`Listening on port ${port}`))