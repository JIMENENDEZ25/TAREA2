const { type } = require("os");

module.exports = (sequelize, Sequelize) => {
  const Rental = sequelize.define("rental", {
    id_renta: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "clients",
        key: "id_cliente"
      }
    },
    id_vehiculo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "vehicles",
        key: "id_vehiculo"
      }
    },
    fecha_inicio: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fecha_fin: {
      type: Sequelize.DATE,
      allowNull: false
    },
    precio_diario: {
        value: 0.00,
        type: "Numeric",
        precision: 10,
        scale: 2
    },
    total: {
        value: 0.00,
        type: "Numeric",
        precision: 10,
        scale: 2
    },
    devuelto: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
  });

  return Rental;
};
