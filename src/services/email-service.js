'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.sendWelcome = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'recato_teste@gmil.com',
        subject: subject,
        body: body
    })
}