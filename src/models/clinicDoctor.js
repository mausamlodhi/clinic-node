module.exports = (sequelize, DataTypes) => {

    const doctorClinic = sequelize.define("doctorClinic", {
        doctorId: {
            type: DataTypes.INTEGER
        },
        clinicId: {
            type: DataTypes.INTEGER
        }
    },
    {
        timestamps:false,
        underscored: true,
        indexes: [
            {
              unique: true,
              fields: ['doctor_id', 'clinic_id']
            }
          ],
    })

    doctorClinic.associate = (model) => {
        doctorClinic.belongsTo(model.doctor, {
            foreignKey: 'doctor_id',
            onDelete: 'cascade'
        });
        doctorClinic.belongsTo(model.clinic, {
            foreignKey: 'clinic_id',
            onDelete: 'cascade'
        })
    };

    return doctorClinic;

}