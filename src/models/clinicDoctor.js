module.exports = (sequelize, DataTypes) => {

    const doctorClinic = sequelize.define("doctorClinic", {

        doctorId: {
            type: DataTypes.INTEGER,
            unique:true,
        },
        clinicId: {
            type: DataTypes.INTEGER,
        }
    },{
        timestamps:false,
        indexes: [
            {
              unique: true,
              fields: ['doctorId', 'clinicId']
            }
          ]
    })

    doctorClinic.associate = (models) => {
        doctorClinic.hasOne(models.doctor, {
            foreignKey: 'doctorId',
            onDelete: 'cascade',
        });
        doctorClinic.belongsTo(models.clinic, {
            foreignKey: 'clinicId',
            onDelete: 'cascade',
        });
    }
    return doctorClinic;
}