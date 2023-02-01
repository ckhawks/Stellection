"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      last_ip_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "User",
      createdAt: "created_at",
      updatedAt: "updated_at",
      // deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );
  return User;
};
