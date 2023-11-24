'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_users.init({
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_users',
  });
  return tbl_users;
};