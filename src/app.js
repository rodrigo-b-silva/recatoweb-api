'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

//Habilita CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//connection database
mongoose.connect(config.connectionString);

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
app.use('/product', productRoute);
app.use('/customer', customerRoute);
app.use('/order', orderRoute);

module.exports = app;