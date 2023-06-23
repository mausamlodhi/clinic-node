module.exports = (sequelize,DataTypes)=>{

    const doctorClinic = sequelize.define("doctorClinic",{

        doctorId : {

            type : DataTypes.INTEGER

        },

        clinicId : {

            type : DataTypes.INTEGER

        }

    })  

    doctorClinic.associate = (model)=>{

        doctorClinic.belongsTo(model.doctor,{

            foreignKey : 'doctorId',

            onDelete : 'cascade'

        });

        doctorClinic.belongsTo(model.clinic,{

            foreignKey : 'clinicId',

            onDelete : 'cascade'

        })

    };

    return doctorClinic;

}