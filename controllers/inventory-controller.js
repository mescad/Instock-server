const knex = require("knex")(require("../knexfile"));

exports.getAll = async (req, res) => {
  const allItems = await knex("warehouses")
    .join("inventories", "inventories.warehouse_id", "warehouses.id")
    .select(
      "inventories.id",
      "warehouses.warehouse_name",
      "inventories.item_name",
      "inventories.description",
      "inventories.category",
      "inventories.status",
      "inventories.quantity"
    );

  res.status(200).json(allItems);
};

exports.getOne = async (req, res) => {
  try {
    const items = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
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

exports.addOneItem = async (req, res) => {
  try {
    // checks if the req.body has all the required information
    if (
      !req.body.item_name ||
      !req.body.description ||
      !req.body.category ||
      !req.body.status ||
      !req.body.quantity ||
      !req.body.warehouse_id
    ) {
      return res
        .status(400)
        .send(
          "Please provide all the information about the item (item_name,warehouse_id description,category,status & quantity)"
        );
    }
    //checks if warehouse id is in the list of warehouses
    const checkWarehouseID = await knex("warehouses")
      .where({ id: req.body.warehouse_id })
      .first();
    if (!checkWarehouseID) {
      return res.status(400).send("warehouse id not found in the list");
    }
    //check is the quantity is a number
    if (typeof req.body.quantity !== "number") {
      return res.status(400).send("wrong quantity format / must be a number");
    }

    const newItemID = await knex("inventories").insert(req.body);
    const newItem = await knex("inventories")
      .where({ id: newItemID[0] })
      .first();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json("Unable to update the new item");
  }
};

exports.updateOneItem = async (req, res) => {
  try {
    // checks if the req.body has all the required information
    if (!req.params.id) {
      return res.status(404).send("item ID not found");
    } else if (!req.body) {
      return res.status(400).send("missing properties in the request body");
    } else if (!req.body.warehouse_id) {
      return res.status(400).send("missing warehouse_id");
    }
    //checks if warehouse id is in the list of warehouses
    const checkWarehouseID = await knex("warehouses")
      .where({ id: req.body.warehouse_id })
      .first();
    if (!checkWarehouseID) {
      return res.status(400).send("warehouse id not found in the list");
    }
    //check is the quantity is a number
    if (typeof req.body.quantity !== "number") {
      return res.status(400).send("wrong quantity format / must be a number");
    }

    await knex("inventories").where({ id: req.params.id }).update(req.body);
    const updatedItem = await knex("inventories")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(updatedItem);
  } catch (error) {
    res
      .status(500)
      .json(`Unable to make changes to current item ID ${req.params.id}`);
  }
};



exports.deleteInventoryItem = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).send(`Inventory ID ${req.params.id} not found`);
    }
    await knex("inventories")
      .where({ "inventories.id": req.params.id })
      .delete();
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).send("Unable to delete the inventory item");
  }
};
