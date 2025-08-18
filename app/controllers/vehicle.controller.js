const e = require("cors");
const db = require("../models");
const Vehicle = db.vehicles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const vehicle = {
    marca: req.body.marca,
    modelo: req.body.modelo,
    anio: req.body.anio,
    matricula: req.body.matricula
  };

  Vehicle.create(vehicle)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Vehicle."
      });
    });
};

exports.findAll = (req, res) => {
  const marca = req.query.marca;
  var condition = marca ? { marca: { [Op.like]: `%${marca}%` } } : null;

  Vehicle.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vehicles."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Vehicle with id=${id} not found.`
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the vehicle."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Vehicle.update(req.body, {
    where: { id_vehiculo: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Vehicle was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the Vehicle."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.destroy({
    where: { id_vehiculo: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Vehicle was deleted successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Vehicle."
      });
    });
};

exports.deleteAll = (req, res) => {
  Vehicle.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({
        message: `${nums} Vehicles were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all vehicles."
      });
    });
};
