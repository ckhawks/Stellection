"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("User");
    await queryInterface.createTable("Role", {
      role_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role_name: {
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
    });
    await queryInterface.createTable(
      "User",
      {
        user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_login_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        last_ip_address: {
          type: Sequelize.STRING,
          allowNull: true,
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
        tableName: "User",
      }
    );
    await queryInterface.bulkInsert("User", [
      {
        username: "testguy233",
        email: "user@emailservice.com",
        password_hash: "hunter2",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Role", [
      {
        role_name: "User",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Role", [
      {
        role_name: "Admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Role");
    await queryInterface.dropTable("User");
  },
};
