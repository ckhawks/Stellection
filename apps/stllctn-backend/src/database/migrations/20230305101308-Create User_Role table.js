"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "User_Role",
      {
        user_id: {
          primaryKey: true,
          references: {
            model: {
              tableName: "User",
            },
            key: "user_id",
          },
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        role_id: {
          primaryKey: true,
          allowNull: false,
          references: {
            model: {
              tableName: "Role",
            },
            key: "role_id",
          },
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
        freezeTableName: true,
        underscored: true,
        tableName: "User_Role",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User_Role");
  },
};
