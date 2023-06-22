module.exports = (sequelize, DataTypes) => {
  const doctorSpecialization = sequelize.define(
    'doctorSpecialization',
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      specializationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'specializations',
          key: 'id',
        },
      },
    },
  );

  doctorSpecialization.associate = (models) => {
    doctorSpecialization.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    doctorSpecialization.belongsTo(models.specialization, {
      foreignKey: 'specializationId',
      onDelete: 'cascade',
    });
    user.belongsToMany(models.specialization, { through: doctorSpecialization, foreignKey: 'userId' });
    specialization.belongsToMany(user, { through: doctorSpecialization, foreignKey: 'specializationId' });

  };
  return doctorSpecialization;
};
