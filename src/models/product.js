'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true, //isto serve para indexar e assim possibilitar a busca mais facil no bd
        unique: [true, "O slug deve ser único"],
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Preço é obrigatório"]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        require: true
    }]
});

module.exports = mongoose.model('Product', schema)
