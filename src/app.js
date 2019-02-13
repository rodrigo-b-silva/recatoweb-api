'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connection database
mongoose.connect('mongodb://recato:recato123@ds046549.mlab.com:46549/recato');

//routes
const indexRoute = require('./routes');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

module.exports = app;