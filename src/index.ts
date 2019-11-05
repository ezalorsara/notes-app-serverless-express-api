import serverless = require('serverless-http');
import express = require('express');
import bodyParser = require('body-parser');

import dotenv = require('dotenv');
dotenv.config();

const app:express.Application = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* ROUTES */
import { noteRouter }  from './routes/notes';
import { billingRouter }  from './routes/billing';

app.use('/notes', noteRouter);
app.use('/billing', billingRouter);

module.exports.handler = serverless(app);