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
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                unique: true
            },
        },
        {timestamps:false}

    );
    doctor.associate = (models) => {
        doctor.belongsTo(models.user, { foreignKey: 'userId' });

        // doctor.hasMany(models.clinic, {
        //     through:models.d,
        //     foreignKey: "doctorId",
        //     onDelete: "cascade"
        // });

    }



    return doctor;

}