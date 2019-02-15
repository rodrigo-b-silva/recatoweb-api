'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const controller = require('../controllers/order-controller');

router.get('/', authService.authorize, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.post('/', authService.authorize, controller.create);

module.exports = router;