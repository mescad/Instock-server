const {
	emptyObject,
	filledAllFieldObject,
	validPhoneNumber,
	validEmail,
} = require("../utils/checkerUtils");

const knex = require("knex")(require("../knexfile"));
// const Checker = require("../utils/checkerUtils");

exports.getAllWarehouse = async (req, res) => {
	const warehouses = await knex("warehouses").select([
		"id",
		" warehouse_name",
		"address",
		"city",
		"country",
		"contact_name",
		"contact_position",
		"contact_phone",
		"contact_email",
	]);
	//rico
	res.json(warehouses);
};

exports.getOneWarehouse = async (req, res) => {
	try {
		const warehouse = await knex("warehouses")
			.where({ id: req.params.id })
			.select([
				"id",
				" warehouse_name",
				"address",
				"city",
				"country",
				"contact_name",
				"contact_position",
				"contact_phone",
				"contact_email",
			])
			.first(); //rico
		if (!warehouse) {
			return res.status(404).json({
				message: `Warehouse with ID: ${req.params.id} not found`,
			});
		}
		res.json(warehouse);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrive user data with ID: ${req.params.id}`,
		}); //rico
	}
};

exports.inventoryInWarehouse = async (req, res) => {
	try {
		const inventories = await knex("warehouses")
			.join("inventories", "inventories.warehouse_id", "warehouses.id")
			.where({ warehouse_id: req.params.id })
			.select([
				"inventories.id",
				"item_name",
				"category",
				"status",
				"quantity",
			]);
		res.json(inventories);
	} catch (error) {
		res.status(500).json({
			message: `Unable to retrieve inventories for warehouse with ID: ${req.params.id} ${error}`,
		});
	}
};

exports.deleteWarehouse = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).send("warehouse ID not found");
    }
    const deleteOneWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({
        message: `ID didn't match the database for deletion id:${req.params.id} ${error}`,
      });
  }
};

exports.createWarehouse = async (req, res) => {
	try {
		const payload = req.body;
		const requiredField = [
			"warehouse_name",
			"address",
			"city",
			"country",
			"contact_name",
			"contact_position",
			"contact_phone",
			"contact_email",
		];

		emptyObject(payload);
		filledAllFieldObject(payload, requiredField);
		validPhoneNumber(payload.contact_phone);
		validEmail(payload.contact_email);

		const newWarehouse = {
			warehouse_name: payload.warehouse_name,
			address: payload.address,
			city: payload.city,
			country: payload.country,
			contact_name: payload.contact_name,
			contact_position: payload.contact_position,
			contact_phone: payload.contact_phone,
			contact_email: payload.contact_email,
		};
		const newRecordIndex = await knex("warehouses").insert([newWarehouse]);
		const result = await knex("warehouses")
			.select(["id", ...requiredField])
			.where({
				id: newRecordIndex[0],
			})
			.first();
      
		res.status(200).json(result);
	} catch (err) {
		res.status(err.statusCode ? err.statusCode : 500).json({
			message: `Problem when creating warehouse, ${err.message}`,
		});
	}
};
