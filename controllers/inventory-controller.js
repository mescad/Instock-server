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


exports.addOneItem=async(req,res)=>{
  try{  
    if (!req.body.item_name || !req.body.description || !req.body.category || !req.body.status || !req.body.quantity){
      return res.status(400).send("Please provide all the information about the item (name, description,category,status & quantity)")
    }
    const newItemID=await knex("inventories").insert(req.body);
    const newItem=await knex("inventories").where({id:newItemID[0]}).first();
    res.status(201).json(newItem)
  
}catch(error){
  res.status(500).json('Unable to update the new item')
}}
