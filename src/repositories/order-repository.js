'use strict';

const mongoose = require('mongoose');
const Order = require('../models/order');

exports.get = async () => {
    let res = await Order.find({});
    return res;
}

exports.getById = async (id) => {
    let res = await Order.findById(id);
    return res;
}

exports.create = async (data) => {
    const order = new Order(data);
    await order.save();
}

exports.update = async (id, data) => {
    await Order.findByIdAndUpdate(id, {
        $set: {
            customer: data.customer,
            number: data.number,
            createAt: data.createAt,
            status: data.status,
            items: data.items
        }
    });
}

exports.remove = async (id) => {
    await Order.findByIdAndRemove(id);
}