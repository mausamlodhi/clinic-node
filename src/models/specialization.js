module.exports = (sequelize, DataTypes) => {
  const specialization = sequelize.define(
    'specialization',
    {
      specialization: {
        type: DataTypes.STRING(50),
      },
    },
    {
      timestamps: false,
      underscored: true
    }
  );
  specialization.associate = (models) => {
    specialization.hasMany(models.doctorSpecialization, {
      foreignKey: "specialization_id"
    });
  }
  return specialization;
};
