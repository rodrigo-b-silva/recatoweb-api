'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');
const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/product-repositoty');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send({ message: "Falha na consulta.", data: error });
        });
};

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send({ message: "Falha na consulta.", data: error });
        });
};

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ slug: req.params.slug }) //findOne serve para trazer só um, já que sabe que ele é unique, assim ñ traz array
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send({ message: "Falha na consulta.", data: error });
        });
};

exports.getByTag = (req, res, next) => {
    Product
        .find({ tags: req.params.tag}, 'title description tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send({ message: "Falha na consulta.", data: error });
        });
};

exports.post = (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter no minimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve ter no minimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve ter no minimo 3 caracteres');

    if(!contract.isValid()){
        res.status(400).send(contract.erros()).end();
        return;
    }

    // let product = new Product();
    // product.title = req.body.title; //desta forma passa um por um, mais demorado porém mais seguro
    let product = new Product(req.body); //é mais facil de implementar, porém é menos seguro
    product
        .save()
        .then(x => {
            res.status(201).send({ message: "Produto cadastro com sucesso." });
        })
        .catch(error => {
            res.status(400).send({ message: "Falha ao cadastrar", data: error })
        });
};

exports.update = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            slug: req.body.slug,
            isActive: req.body.isActive,
            tags: req.body.tags
        }
    })
    .then(data => {
        res.status(201).send({ message: "Produto atualizado com sucesso" });
    })
    .catch(error => {
        res.status(400).send({ message: "Falha na atualização", data: error });
    });
};

exports.remove = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id)
    .then(data => {
        res.status(201).send({ message: "Produto removido com sucesso" });
    })
    .catch(error => {
        res.status(400).send({ message: "Falha na remoção", data: error });
    });
};