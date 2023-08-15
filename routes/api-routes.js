const express = require('express');
const router = express.Router();
const apiController = require("../controllers/api-controller");
const inventoryController = require('../controllers/inventory-controller')

router 
    .route('/inventories')
    .get(inventoryController.getAll);


router
    .route('/inventories/:id')
    .get(inventoryController.getOne)
module.exports = router;