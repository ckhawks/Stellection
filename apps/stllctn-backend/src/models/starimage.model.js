module.exports = (sequelize, Sequelize) => {
  const StarImage = sequelize.define(
    "StarImage",
    {
      starimage_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "files",
          key: "file_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      star_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stars",
          key: "star_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "StarImage",
      createdAt: "created_at",
      updatedAt: "updated_at",
      //   deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  StarImage.associate = (models) => {
    StarImage.belongsTo(models.Star, {
      foreignKey: "star_id",
      // as: "star_image",
    });
    StarImage.hasOne(models.File, {
      foreignKey: "file_id",
    });
  };

  return StarImage;
};
