module.exports = (sequelize, Sequelize) => {
  const StarText = sequelize.define(
    "StarText",
    {
      startext_id: {
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
      text_type: {
        type: Sequelize.STRING,
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
      tableName: "StarText",
      createdAt: "created_at",
      updatedAt: "updated_at",
      //   deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  StarText.associate = (models) => {
    StarText.belongsTo(models.Star);
    StarText.hasOne(models.File);
  };

  return StarText;
};
