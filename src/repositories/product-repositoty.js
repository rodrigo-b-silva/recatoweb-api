'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get = () => {
    //Product.find({ isActive: true }, 'title slug tags') //opção que faz um where só dos que estão ativos e filtra quais campos quer apresentar
    return Product.find({})
}