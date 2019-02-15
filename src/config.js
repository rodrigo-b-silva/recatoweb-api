'use strict';

global.SALT_KEY = '5d5bf9d6161569f8dd85affca9ba8362';
global.EMAIL_TEMPLATE = `<div>
                            <h3>Recato Coorp</h3>
                            <p>Olá <strong>{0}</strong>, seja bem-vendo a RecatoCoorp</p>
                        </div>`;

module.exports = {
    connectionString: 'mongodb://recato:recato123@ds046549.mlab.com:46549/recato',
    sendgridKey: '',
    containerConnectionString: ''
}