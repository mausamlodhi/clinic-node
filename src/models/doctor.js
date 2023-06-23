module.exports = (sequelize, DataTypes) => {

    const doctor = sequelize.define(

        'doctor',

        {

            dateOfBirth: {

                type: DataTypes.DATEONLY,

            },

            address: {

                type: DataTypes.STRING,

            },

            experience: {

                type: DataTypes.STRING,

            },

            userId: {

                type: DataTypes.INTEGER,
                unique:true

            },

        }

    );

    doctor.associate = (models) => {

        doctor.belongsTo(models.user, { foreignKey: 'userId' });

        doctor.hasOne(models.doctorClinic,{

            foreignKey : "doctorId",

            onDelete : "cascade"

        });

    }

   

    return doctor;

}