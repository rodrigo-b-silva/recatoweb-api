'use strict';

const ValidatorContract = require('../validator/validator-inputs');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');

const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(
            req.body.email, 
            'Seja bem-vindo a Recato',
            global.EMAIL_TEMPLATE.replace('{0}', req.body.name));

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

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        console.log(req.body);
        console.log(md5(req.body.password + global.SALT_KEY));

        if(!customer){
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({ 
            token: token,
            data: { email: customer.email, name: customer.name }
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({ message: 'Falha ao cadastrar' });
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.refreshToken(data.id);

        if(!customer){
            res.status(404).send({
                message: 'Usuário não encontrado'
            })
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({ 
            token: tokenData,
            data: { email: customer.email, name: customer.name }
        });
    } catch (e) {
        res.status(400).send({ message: 'Falha ao cadastrar' });
    }
}