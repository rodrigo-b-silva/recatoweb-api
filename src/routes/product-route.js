'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/slug/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.authorize, controller.create);
router.put('/:id', authService.authorize, controller.update);
router.delete('/:id', authService.authorize, controller.remove);

module.exports = router;