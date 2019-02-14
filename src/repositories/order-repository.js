'use strict';

const mongoose = require('mongoose');
const Order = require('../models/order');

exports.get = async () => {
    let res = await Order.find({});
    return res;
}

exports.getById = async (id) => {
    //let res = await Order.findById(id);
    let res = await Order.findById(id)
        .populate('customer')
        .populate('items.product', 'title price tags'); //nesta opção, pega o id e automaticamente traz os dados do customer
    return res;
}

exports.create = async (data) => {
    const order = new Order(data);
    await order.save();
}