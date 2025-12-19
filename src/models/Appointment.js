const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define("Appointment", {
  petName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Appointment;

