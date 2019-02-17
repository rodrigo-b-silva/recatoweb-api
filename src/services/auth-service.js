'use strict';

const jwt = require('jsonwebtoken');
const customer = require('../controllers/customer-controller');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY);
    return data; 
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        })
    }
}

exports.isAdmin = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                if(decoded.roles.includes('admin')){
                    next();
                } else {
                    res.status(403).send('Você não possui privilégios para esta ação');
                }
            }
        })
    }

}