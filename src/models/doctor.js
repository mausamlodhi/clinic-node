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
                unique:true,
                references: {
                    model: 'users', // Name of the referenced table
                    key: 'id', // Primary key of the referenced table
                },
            },
        }
    );

    // doctor.associate = (models) => {
    //     doctor.belongsTo(models.user, { foreignKey: 'userId' });
    // }
    return doctor;
}