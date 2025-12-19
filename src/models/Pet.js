// src/models/Pet.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Pet = sequelize.define("Pet", {
  name: DataTypes.STRING,
  species: DataTypes.STRING,
});

User.hasMany(Pet);
Pet.belongsTo(User);

module.exports = Pet;
