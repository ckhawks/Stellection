module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define(
    "File",
    {
      file_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      md5_hash: Sequelize.STRING,
      file_path: Sequelize.STRING,
      original_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "File",
      createdAt: "created_at",
      updatedAt: "updated_at",
      //   deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  File.associate = (models) => {
    File.belongsTo(models.StarImage);
    File.belongsTo(models.StarText);
  };

  return File;
};
