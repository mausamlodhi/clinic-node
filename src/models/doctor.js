module.exports = (sequelize, DataTypes) => {
  const doctor = sequelize.define(
    "doctor",
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
        unique: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
  doctor.associate = (models) => {
    doctor.belongsTo(models.user, { foreignKey: "user_id" });
  };

  return doctor;
};
