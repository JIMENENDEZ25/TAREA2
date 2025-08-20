const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const client = {
    id_cliente: req.body.id_cliente,
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion
  };

  Client.create(client)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Client."
      });
    });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    Client.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients."
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Client with id=${id} not found.`
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the client."
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id_cliente: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Client was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the Client."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({
    where: { id_cliente: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Client was deleted successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Client."
      });
    });
};

exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({
        message: `${nums} Clients were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all clients."
      });
    });
};
