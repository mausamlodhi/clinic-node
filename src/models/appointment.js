module.exports = (sequelize,DataTypes)=>{
    const appointmentSchema = sequelize.define("appointment",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        appointmentDate:{
            type:DataTypes.STRING(15),
            required:true,
            allowNull:false,
        },
        appointmentDuration:{
            type:DataTypes.STRING(12),
            allowNull:false,
            trim:true,
            required:true
        },
        doctorId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        clinicId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
    // appointmentSchema.associate=(model)=>{
    //     appointmentSchema.belongsTo(model.patient,{
    //         foreignKey:"patientId"
    //     }),
    //     appointmentSchema.belongsTo(model.doctor,{
    //         foreignKey:"doctorId"
    //     }),
    //     appointmentSchema.belongsTo(model.clinic,{
    //         foreignKey:"clinicId"
    //     })
    // }
    return appointmentSchema;
}