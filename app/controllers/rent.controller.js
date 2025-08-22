const db = require("../models");
const Rental = db.rentals;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const rental = {
    id_renta: req.body.id_renta,
    id_cliente: req.body.id_cliente,
    id_vehiculo: req.body.id_vehiculo,
    fecha_inicio: req.body.fecha_inicio,
    fecha_fin: req.body.fecha_fin
  };

  // Validate client and vehicle existence
  try {
    const db = require("../models");
    const Client = db.clients;
    const Vehicle = db.vehicles;

    const client = await Client.findByPk(rental.id_cliente);
    if (!client) {
      return res.status(400).send({ message: `Client with id=${rental.id_cliente} does not exist.` });
    }

    const vehicle = await Vehicle.findByPk(rental.id_vehiculo);
    if (!vehicle) {
      return res.status(400).send({ message: `Vehicle with id=${rental.id_vehiculo} does not exist.` });
    }

    const data = await Rental.create(rental);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Rental."
    });
  }
};

exports.findAll = (req, res) => {
  const id_cliente = req.query.id_cliente;
  const id_vehiculo = req.query.id_vehiculo;
  let condition = {};
  if (id_cliente) condition.id_cliente = { [Op.like]: `%${id_cliente}%` };
  if (id_vehiculo) condition.id_vehiculo = { [Op.like]: `%${id_vehiculo}%` };

  Rental.findAll({ where: Object.keys(condition).length ? condition : undefined })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rentals."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Rental.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Rental with id=${id} not found.`
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the rental."
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const db = require("../models");
    const Client = db.clients;
    const Vehicle = db.vehicles;

    if (req.body.id_cliente) {
      const client = await Client.findByPk(req.body.id_cliente);
      if (!client) {
        return res.status(400).send({ message: `Client with id=${req.body.id_cliente} does not exist.` });
      }
    }
    if (req.body.id_vehiculo) {
      const vehicle = await Vehicle.findByPk(req.body.id_vehiculo);
      if (!vehicle) {
        return res.status(400).send({ message: `Vehicle with id=${req.body.id_vehiculo} does not exist.` });
      }
    }

    const num = await Rental.update(req.body, { where: { id_renta: id } });
    if (num == 1 || (Array.isArray(num) && num[0] == 1)) {
      res.status(200).send({ message: "Rental was updated successfully." });
    } else {
      res.status(404).send({ message: `Cannot update Rental with id=${id}. Maybe Rental was not found or req.body is empty!` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while updating the Rental." });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      return res.status(404).send({ message: `Cannot delete Rental with id=${id}. Maybe Rental was not found!` });
    }
    await Rental.destroy({ where: { id_renta: id } });
    res.status(200).send({ message: "Rental was deleted successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while deleting the Rental." });
  }
};

exports.deleteAll = (req, res) => {
  Rental.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({
        message: `${nums} Rentals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all rentals."
      });
    });
};
