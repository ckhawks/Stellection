module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "Role",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: "User_Role",
      as: "users",
      foreignKey: "role_id",
      // otherKey: "role_id",
    });
  };

  return Role;
};
