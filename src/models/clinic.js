module.exports = (sequelize,DataTypes)=>{
    const clinic = sequelize.define("clinic",{
        name:{
            type : DataTypes.STRING(255),
            required : true,
            trim : true,
            unique : true,
        },
        address : {
            type : DataTypes.STRING(255),
            required : true,
            trim : true,
        },
        contact : {
            type : DataTypes.STRING(13),
            required:true,
            trim : true,
            unique : true
        },
        image : {
            type : DataTypes.STRING(255),
            trim : true,
            unique : true
        }
    });
    clinic.associate = (model)=>{
        clinic.hasMany(model.user,{
            foriegnKey : "doctorId",
            onDelete : "cascade"
        });
        clinic.hasMany(model.user,{
            foreignKey : "patientId",
            onDElete : "cascade"
        })
        
    }
    return clinic;
}