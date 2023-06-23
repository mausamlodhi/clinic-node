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
    doctorSpecialization.belongsTo(models.specialization, { through: doctorSpecialization, foreignKey: 'userId' });
    doctorSpecialization.belongsTo(models.user, { through: doctorSpecialization, foreignKey: 'specializationId' });
  };
  return doctorSpecialization;
};
