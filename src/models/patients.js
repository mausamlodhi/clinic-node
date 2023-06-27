module.exports = (sequelize, DataTypes) => {

    const patient = sequelize.define(
        'patient',
        {
            dateOfBirth: {
                type: DataTypes.DATEONLY,
            },

            address: {
                type: DataTypes.STRING,
            },

            diabitic: {
                type: DataTypes.STRING,
            },
            insurance: {
                type: DataTypes.STRING,
            },
            userId: {
                type: DataTypes.INTEGER,
                unique: true
            },
            clinicId:{
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps:false,
            underscored: true
        }
    );
    patient.associate = (models) => {
        patient.belongsTo(models.user, { foreignKey: 'userId'});
        patient.hasMany(models.appointment,{
           foreignKey:"patientId",
           onDelete:"cascade" 
        }),
        patient.belongsTo(models.clinic, {
          foreignKey: 'clinic_id',
        });
    }
    return patient;
}