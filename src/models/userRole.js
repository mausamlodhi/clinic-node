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
    {timestamps:false,
      indexes: [
        // Create a composite index to enforce uniqueness of the combination (doctorId, clinicId)
        {
          unique: true,
          fields: ['userId', 'roleId']
        }
      ],}
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
