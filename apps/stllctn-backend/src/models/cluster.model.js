module.exports = (sequelize, Sequelize) => {
  const Cluster = sequelize.define(
    "Cluster",
    {
      cluster_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cluster_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      slug_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "slugs",
          key: "slug_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cluster_desc: {
        // do we need a cluster desc? yessir!!!
        type: Sequelize.STRING,
        // defaultValue: "basic tag",
        allowNull: true,
      },
      public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false, // public or private default ? private
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "Cluster",
      createdAt: "created_at",
      updatedAt: "updated_at",
      //   deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  return Cluster;
};
