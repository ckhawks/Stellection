"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "File",
      {
        file_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        file_path: {
          type: Sequelize.STRING,
        },
        md5_hash: {
          type: Sequelize.STRING,
        },
        original_name: {
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
        tableName: "File",
      }
    );

    await queryInterface.createTable(
      "StarImage",
      {
        starimage_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        file_id: {
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
        tableName: "StarImage",
      }
    );

    await queryInterface.createTable(
      "StarText",
      {
        startext_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        file_id: {
          type: Sequelize.INTEGER,
        },
        text_type: {
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
        tableName: "StarText",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("File");
    await queryInterface.dropTable("StarImage");
    await queryInterface.dropTable("StarText");
  },
};
