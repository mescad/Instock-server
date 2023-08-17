const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api-controller");
const inventoryController = require("../controllers/inventory-controller");

// Inventories
router
	.route("/inventories")
	.get(inventoryController.getAll)
	.post(inventoryController.addOneItem);
  
router
	.route("/inventories/:id")
	.get(inventoryController.getOne)
	.put(inventoryController.updateOneItem)
	.delete(inventoryController.deleteInventoryItem);

// Warehouses
router
	.route("/warehouses")
	.get(apiController.getAllWarehouse)
	.post(apiController.createWarehouse);

router
	.route("/warehouses/:id")
	.get(apiController.getOneWarehouse)
	.delete(apiController.deleteWarehouse);

// get inventories on single warehouse
router
	.route("/warehouses/:id/inventories")
	.get(apiController.inventoryInWarehouse);

module.exports = router;
