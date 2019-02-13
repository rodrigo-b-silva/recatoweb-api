'use strict';

const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/product-repositoty');

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

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.create = async (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter no minimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve ter no minimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve ter no minimo 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.erros()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastro com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar' });
    }
}

exports.update = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Produto atualizado com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha na atualização' });
    }
}

exports.remove = async (req, res, next) => {
    try {
        await repository.remove(req.params.id);
        res.status(201).send({ message: 'Produto removido com sucesso' });
    } catch (e) {
        res.status(400).send({ message: 'Falha na remoção' });
    }
}