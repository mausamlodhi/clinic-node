module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define(
    'userRole',
    {
      userId: {
        type: DataTypes.INTEGER,
        unique:true
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
    },
    {timestamps:false}
  );

  userRole.associate = (models) => {
    userRole.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    userRole.belongsTo(models.role, {
      foreignKey: 'roleId',
      onDelete: 'cascade',
    });
  };
  return userRole;
};
