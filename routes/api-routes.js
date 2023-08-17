const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api-controller");
const inventoryController = require("../controllers/inventory-controller");

// Inventories
router.route("/inventories").get(inventoryController.getAll);
router.route("/inventories/:id").get(inventoryController.getOne);

// Warehouses
router.route("/warehouses").get(apiController.getAllWarehouse);
router.route("/warehouses/:id").get(apiController.getOneWarehouse);
router.route("/warehouses").post(apiController.createWarehouse);

// get inventories on single warehouse
router
	.route("/warehouses/:id/inventories")
	.get(apiController.inventoryInWarehouse);

module.exports = router;
