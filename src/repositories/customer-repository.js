'use strict';

const mongoose = require('mongoose');
const Customer = require('../models/customer');

exports.get = async() => {
    const res = await Customer.find({});
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.create = async(data) => {
    const customer = new Customer(data);
    await customer.save();
}

exports.update = async(id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.remove = async(id) => {
    await Customer.findByIdAndRemove(id);
}