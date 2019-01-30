'user strict';

const mongoose = require('mongoose');
const Order = require('../models/order');
const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/order-repository');

exports.get = async (req, res, next) => {
    try{
        let data = await repository.get();
        res.status(200).send({ data });
    } catch(e){
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id);
        res.status(200).send({ data });
    } catch(e){
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.create = async (req, res, next) => {
    try{
        await repository.create(req.body);
        res.staus(201).send({ message: 'Ordem criada com sucesso' });
    } catch(e){
        res.status(400).send({ message: 'Falha no cadastro' });
    }
}

exports.update = async (req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Ordem atualizada com sucesso' });
    } catch(e){
        res.status(400).send({ message: 'Falha na atualização' });
    }
}

exports.remove = async (req, res, next) => {
    try{
        await repository.remove(req,params.id);
        res.status(201).send({ message: 'Ordem excluida com sucesso' });
    } catch(e){
        res.status(400).send({ message: 'Falha na remoção' });
    }
}