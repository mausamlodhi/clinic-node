module.exports = (sequelize, DataTypes) => {
  const doctorSpecialization = sequelize.define(
    'doctorSpecialization',
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      specializationId: {
        type: DataTypes.INTEGER,
      },
    },
    {timestamps:false}
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
   

  };
  return doctorSpecialization;
};
