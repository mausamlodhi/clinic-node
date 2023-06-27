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
      underscored: true,
      indexes: [
        // Create a composite index to enforce uniqueness of the combination (doctorId, clinicId)
        {
          unique: true,
          fields: ['doctor_id', 'specialization_id']
        }
      ],}
  );

  doctorSpecialization.associate = (models) => {
    doctorSpecialization.belongsTo(models.doctor, {
      foreignKey: 'doctor_id',
      onDelete: 'cascade',
    });
    doctorSpecialization.belongsTo(models.specialization, {
      foreignKey: 'specialization_id',
      onDelete: 'cascade',
    });
   

  };
  return doctorSpecialization;
};
