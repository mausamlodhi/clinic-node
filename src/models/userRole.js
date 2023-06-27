module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define(
    'userRole',
    {
      userId: {
        type: DataTypes.INTEGER,
        unique: true
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
      indexes: [
        // Create a composite index to enforce uniqueness of the combination (doctorId, clinicId)
        {
          unique: true,
          fields: ['user_id', 'role_id']
        }
      ],
    }
  );

  userRole.associate = (models) => {
    userRole.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'cascade',
    });
    userRole.belongsTo(models.role, {
      foreignKey: 'role_id',
      onDelete: 'cascade',
    });
  };
  return userRole;
};
