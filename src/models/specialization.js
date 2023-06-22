module.exports = (sequelize, DataTypes) => {
    const specialization = sequelize.define(
      'specialization',
      {
        specialization: {
          type: DataTypes.STRING(50),
        },
      },
    );
    return specialization;
  };
  