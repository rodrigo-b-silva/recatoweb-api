'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get = async () => {
    //Product.find({ isActive: true }, 'title slug tags') //opção que faz um where só dos que estão ativos e filtra quais campos quer apresentar
    const res = await Product.find({});
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({ slug: slug }); //findOne serve para trazer só um, já que sabe que ele é unique, assim ñ traz array
    return res;
}

exports.getByTag = async (tags) => {
    const res = await Product.find({ tags: tags}, 'title description tags');
    return res;
}

exports.create = async (data) => {
    // let product = new Product();
    // product.title = req.body.title; //desta forma passa um por um, mais demorado, porém mais seguro
    const product = new Product(data); //é mais facil de implementar, porém é menos seguro
    await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            price: data.price,
            description: data.description,
            slug: data.slug,
            isActive: data.isActive,
            tags: data.tags
        }
    });
}

exports.remove = async (id) => {
    await Product.findByIdAndRemove(id);
    return res;
}