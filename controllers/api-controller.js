const knex = require('knex')(require('../knexfile'));

exports.getAllWarehouse = async (req, res) => {
  const warehouses = await knex('warehouses').select([
    'id',
    ' warehouse_name',
    'address',
    'city',
    'country',
    'contact_name',
    'contact_position',
    'contact_phone',
    'contact_email'
  ]);
  //rico
  res.json(warehouses);
};

exports.getOneWarehouse = async (req, res) => {
  try {
    const warehouse = await knex('warehouses')
      .where({ id: req.params.id })
      .select([
        'id',
        ' warehouse_name',
        'address',
        'city',
        'country',
        'contact_name',
        'contact_position',
        'contact_phone',
        'contact_email'
      ])
      .first(); //rico
    if (!warehouse) {
      return res.status(404).json({
        message: `Warehouse with ID: ${req.params.id} not found`
      });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrive user data with ID: ${req.params.id}`
    }); //rico
  }
};

exports.inventoryInWarehouse = async (req, res) => {
  try {
    const inventories = await knex('warehouses')
      .join('inventories', 'inventories.warehouse_id', 'warehouses.id')
      .where({ warehouse_id: req.params.id })
      .select([
        'inventories.id',
        'item_name',
        'category',
        'status',
        'quantity'
      ]);
    res.json(inventories);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve inventories for warehouse with ID: ${req.params.id} ${error}`
    });
  }
};



exports.deleteWarehouse = async (req, res) =>{
  try{
    const deleteOneWarehouse = await knex('warehouses')
    .join('inventories', 'inventories.warehouse_id', 'warehouses.id')
    .where({warehouse_id: req.params.id})
    .delete();
    res.sendStatus(204)}
    catch(error){
      res.status(500).json({message:`id didn't match the database for delettion id:${req.params.id} ${error}`})
    }
  }


//exports.
