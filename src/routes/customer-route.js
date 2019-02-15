'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', authService.authorize, controller.remove);
router.post('/authenticate', controller.authenticate)

module.exports = router;