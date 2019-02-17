'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.get('/slug/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.isAdmin, controller.create);
router.put('/:id', authService.isAdmin, controller.update);
router.delete('/:id', authService.isAdmin, controller.remove);

module.exports = router;