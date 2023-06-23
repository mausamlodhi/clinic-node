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
        }

    );

    patient.associate = (models) => {

        patient.belongsTo(models.user, { foreignKey: 'userId' });

        patient.hasMany(models.clinicPatient, {

            foreignKey: "patientId",

            onDelete: "cascade"

        })

    }

    return patient;

}