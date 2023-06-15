import { Op } from "sequelize";
module.exports = (sequelize,DataTypes)=>{
    const patient = sequelize.define("patient",{
        name : {
            type: DataTypes.STRING(50),
            allowNull : false,
            trim : true
        },
        email : {
            type : DataTypes.STRING(50),
            allowNull:false,
            trim : true
        },
        contact : {
            type : DataTypes.STRING(13),
            allowNull : false,
            trim : true
        },
        password : {
            type:DataTypes.STRING(255),
            allowNull:false,
            trim : true
        },
        profileImage:{
            type : DataTypes.STRING(255),
            allowNull : false,

        },
        gender : {
            type : DataTypes.STRING(15)
        },
        dateOfBirth : {
            type: DataTypes.STRING(20)
        }
    });  
    patient.addScope('patient', (data) => ({
        where: {
          [Op.and]: [ data.where],
        },
        having: data.havingWhere,
        attributes: data.attributes,
      }));
    return patient;
}