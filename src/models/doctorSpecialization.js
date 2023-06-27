module.exports = (sequelize, DataTypes) => {
  const doctorSpecialization = sequelize.define(
    'doctorSpecialization',
    {
      doctorId: {
        type: DataTypes.INTEGER,
      },
      specializationId: {
        type: DataTypes.INTEGER,
      },
    },
    {timestamps:false,
      indexes: [
        // Create a composite index to enforce uniqueness of the combination (doctorId, clinicId)
        {
          unique: true,
          fields: ['doctorId', 'specializationId']
        }
      ],}
  );

  doctorSpecialization.associate = (models) => {
    doctorSpecialization.belongsTo(models.doctor, {
      foreignKey: 'doctorId',
      onDelete: 'cascade',
    });
    doctorSpecialization.belongsTo(models.specialization, {
      foreignKey: 'specializationId',
      onDelete: 'cascade',
    });
   

  };
  return doctorSpecialization;
};
