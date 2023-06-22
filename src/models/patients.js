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
            diabitic:{
               type: DataTypes.STRING,
            },
            insurance:{
                type: DataTypes.STRING,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'users', // Name of the referenced table
                  key: 'id', // Primary key of the referenced table
                },
              },
        }
    );

    patient.associate = (models) => {
        patient.belongsTo(models.users, { foreignKey: 'userId'});
    }
    return patient;
}