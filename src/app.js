'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//conection database
mongoose.connect('mongodb://recato:recato123@ds046549.mlab.com:46549/recato');

//routes
const indexRoute = require('./routes');
const productRoute = require('./routes/product-route');

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;