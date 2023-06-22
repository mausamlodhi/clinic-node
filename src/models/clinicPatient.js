module.exports = (sequelize, DataTypes) => {

    const patientClinic = sequelize.define("patientClinic", {

        patientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patients',
                key: 'id',
            },
        },
        clinicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'clinics',
                key: 'id',
            },
        }
    },{
        timestamps:false,
        indexes: [
            {
              unique: true,
              fields: ['patientId', 'clinicId']
            }
          ]
    })

    patientClinic.associate = (models) => {
        patientClinic.belongsTo(models.patient, {
            foreignKey: 'patientId',
            onDelete: 'cascade',
        });
        patientClinic.belongsTo(models.clinic, {
            foreignKey: 'clinicId',
            onDelete: 'cascade',
        });
    }
    return patientClinic;
}