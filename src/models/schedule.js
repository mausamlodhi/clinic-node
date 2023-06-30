module.exports = (sequelize, DataTypes) => {
    const schedule = sequelize.define('schedule', {
        scheduleDuration: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            trim: true
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            trim: true
        },
        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            trim: true
        },
        scheduleShift: {
            type: DataTypes.STRING(100),
            allowNull: false,
            trim: true
        }
    });

    schedule.associate = (model) => {
        schedule.belongsTo(model.doctor, {
            foreignKey: "doctorId",
            onDelete: "cascade"
        }),
            schedule.belongsTo(model.clinic, {
                foreignKey: "clinicId",
                onDelete: "cascade"
            })
    }
    return schedule;
}