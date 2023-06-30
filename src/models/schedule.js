module.exports=(sequelize,DataTypes)=>{
    const schedule=sequelize.define('schedule',{
        appointmentDuration:{
            type:DataTypes.STRING(1000),
            allowNull:false,
            trim:true
        },
        doctorId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            trim:true
        }
    });
    schedule.associate=(model)=>{
        schedule.belongsTo(model.doctor,{
            foreignKey:"doctorId",
            onDelete:"cascade"
        })
    }
    return schedule;
}