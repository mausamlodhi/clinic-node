module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
      'admin',
      {
        email: {
          type: DataTypes.STRING(256),
        },
        password: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
    );
return user;
};