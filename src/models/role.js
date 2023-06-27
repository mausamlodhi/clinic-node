module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      role: {
        type: DataTypes.STRING(50),
      },
    }
    ,
    {timestamps:false,
      underscored: true}
  );
  role.associate = (models) => {
    role.hasMany(models.userRole, {
      foreignKey: 'role_id',
    });

  };
  return role;
};
