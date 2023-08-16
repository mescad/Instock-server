const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.route('/warehouses').get(apiController.getAllWarehouse); //rico

router.route('/warehouses/:id').get(apiController.getOneWarehouse); //rico

module.exports = router;
