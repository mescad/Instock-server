const knex = require('knex')(require('../knexfile'));

exports.getAllWarehouse = async (req, res) => {
  const warehouses = await knex('warehouses').select([
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

//exports.
