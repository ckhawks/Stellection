"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Product belongsToMany Tag
    return queryInterface.createTable(
      "Cluster_Star",
      {
        cluster_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: {
              tableName: "Cluster",
            },
            key: "cluster_id",
          },
          allowNull: false,
        },
        star_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: {
              tableName: "Star",
            },
            key: "star_id",
          },
          allowNull: false,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // remove table
    return queryInterface.dropTable("Cluster_Star");
  },
};
