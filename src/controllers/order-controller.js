'user strict';

const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try{
        let data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.getById = async (req, res, next) => {
    try{
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(e){
        res.status(400).send({ message: 'Falha na consulta' });
    }
}

exports.create = async (req, res, next) => {
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = authService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso' });
    } catch(e){
        res.status(400).send({ message: 'Falha no cadastro', e });
    }
}