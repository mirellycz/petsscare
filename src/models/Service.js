// src/models/Service.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Service = sequelize.define("Service", {
  name: DataTypes.STRING,
});

module.exports = Service;
