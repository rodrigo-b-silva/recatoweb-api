'use strict';

const mongoose = require('mongoose');
const Customer = require('../models/customer');
const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/customer-repository');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha na consulta' });
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.create = async (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter no minimo 3 caracteres');
    contract.isEmail(req.body.email, 'O email precisa ser valido');
    contract.hasMinLen(req.body.password, 4, 'A senha deve ter no minimo 4 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.erros()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Cliente cadastro com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar' });
    }
}

exports.update = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Cliente atualizado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha na atualização' });
    }
}

exports.remove = async (req, res, next) => {
    try {
        await repository.remove(req.params.id);
        res.status(201).send({ message: 'Cliente removido com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha na remoção' });
    }
}