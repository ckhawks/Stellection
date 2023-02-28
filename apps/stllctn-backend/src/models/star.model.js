module.exports = (sequelize, Sequelize) => {
  const Star = sequelize.define(
    "Star",
    {
      star_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      star_title: Sequelize.STRING,
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
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "Star",
      createdAt: "created_at",
      updatedAt: "updated_at",
      //   deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  Star.associate = (models) => {
    Star.belongsToMany(models.Cluster, {
      through: "Cluster_Star",
      as: "clusters",
      foreignKey: "star_id",
    });
    Star.hasOne(models.StarImage);
    Star.hasOne(models.StarText);
  };

  return Star;
};
