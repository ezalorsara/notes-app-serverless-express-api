import serverless = require('serverless-http');
import express = require('express');
import bodyParser = require('body-parser');

const app:express.Application = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ROUTES */
import { noteRouter }  from './routes/notes';

app.use('/notes', noteRouter);

module.exports.handler = serverless(app);