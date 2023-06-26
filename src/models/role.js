module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      role: {
        type: DataTypes.STRING(50),
      },
    }
    ,
    {timestamps:false}
  );
  role.associate = (models) => {

    role.hasMany(models.userRole, {

      foreignKey: 'roleId',

    });

  };
  return role;
};
