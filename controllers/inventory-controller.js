const knex = require("knex")(require("../knexfile"));

exports.getAll = async (req, res) => {
  const allItems = await knex("warehouses")
    .join("inventories", "inventories.warehouse_id", "warehouses.id")
    .select("inventories.id", "warehouses.warehouse_name", "inventories.item_name", "inventories.description", "inventories.category", "inventories.status", "inventories.quantity");

  res.status(200).json(allItems);
};

exports.getOne = async (req, res) => {
  try {
    const items = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .select("inventories.id", "warehouses.warehouse_name", "inventories.item_name", "inventories.description", "inventories.category", "inventories.status", "inventories.quantity")
      .where({ "inventories.id": req.params.id });

    if (!items) {
      return res.status(404).json({
        message: `Item with ID: ${req.params.id} not found`,
      });
    }
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Unable to retrieve item data for item with ID: ${req.params.id}`,
    });
  }
};
