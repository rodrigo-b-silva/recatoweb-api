'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'rodrigo.barbosa@fcamara.com.br',
        subject: subject,
        html: body
    });
}