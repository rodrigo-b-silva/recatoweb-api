'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');

exports.post = (req, res, next) => {
    // let product = new Product();
    // product.title = req.body.title;
    let product = new Product(req.body); //é mais facil de implementar, porém é menos seguro
    product.save();
    res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.remove = (req, res, next) =>{
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};