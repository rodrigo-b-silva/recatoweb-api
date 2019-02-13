'user strict';

const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/order-repository');
const guid = require('guid');

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
        await repository.create({
            customer: req.body.customer,
            number: req.body.number,
            items: req.body.items
        });
        res.staus(201).send({ message: 'Pedido cadastrado com sucesso' });
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