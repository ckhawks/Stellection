"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Cluster",
      {
        cluster_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cluster_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        slug_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        cluster_desc: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        public: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cluster");
  },
};
