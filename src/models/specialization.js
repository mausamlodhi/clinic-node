module.exports = (sequelize, DataTypes) => {
    const specialization = sequelize.define(
      'specialization',
      {
        specialization: {
          type: DataTypes.STRING(50),
        },
      },
    );
    specialization.associate = (models)=>{
      specialization.hasMany(models.doctorSpecialization,{
        foreignKey : "specializationId"
      });
    }
    return specialization;
  };
  