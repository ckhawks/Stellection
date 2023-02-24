"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Star",
      {
        star_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        star_title: {
          type: Sequelize.STRING,
        },
        slug_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
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
        underscored: true,
        freezeTableName: true,
        tableName: "Star",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Star");
  },
};
