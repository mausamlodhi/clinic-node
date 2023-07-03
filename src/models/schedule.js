module.exports = (sequelize, DataTypes) => {
    const schedule = sequelize.define('schedule', {
        scheduleDuration: {
            type: DataTypes.STRING(100),
            allowNull: false,
            trim: true
        }, // 15 mins 30 mins 45 mins 
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
        }, // monday-friday, monday-saturday
        scheduleTime :{
            type: DataTypes.STRING(1000),
            allowNull: false,
            trim: true
        } ,// 9:00-17:00 , 9:00-18:00 , 9:00-19:00

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