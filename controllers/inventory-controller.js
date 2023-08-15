const knex = require("knex")(require("../knexfile"));

exports.getAll = async (req, res) => {
  const allItems = await knex("inventories");
  res.json(allItems);
};

exports.getOne = async (req, res) => {
  try {
    const item = await knex("inventories").where({ id: req.params.id }).first();

    if (!item) {
      return res.status(404).json({
        message: `Item with ID: ${req.params.id} not found`,
      });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve item data for item with ID: ${req.params.id}`,
    });
  }
};
