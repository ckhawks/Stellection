"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "User",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        last_login_at: {
          type: Sequelize.DATE,
        },
        last_ip_address: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
        underscored: true,
        tableName: "Cluster",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User");
  },
};
