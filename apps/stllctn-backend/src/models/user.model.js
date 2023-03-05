module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      password_hash: Sequelize.STRING,
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      tableName: "User",
      createdAt: "created_at",
      updatedAt: "updated_at",
      // deletedAt: "deleted_at", // if you have paranoid on as well
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: "User_Role",
      as: "roles",
      foreignKey: "user_id",
      // otherKey: "user_id",
    });
  };

  return User;
};
