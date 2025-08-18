module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicle", {
    id_vehiculo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    marca: {
      type: Sequelize.STRING,
      allowNull: false
    },
    modelo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    anio: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    disponible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  return Vehicle;
};
