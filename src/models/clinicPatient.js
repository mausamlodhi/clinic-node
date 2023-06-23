module.exports = (sequelize,DataTypes)=>{

    const clinicPatient = sequelize.define("clinicPatient",{
        patientId : {
            type : DataTypes.INTEGER
        },

        clinicId:{

            type: DataTypes.INTEGER

        }

    });

    clinicPatient.associate = (model)=>{

        clinicPatient.belongsTo(model.patient,{

            foreignKey : 'patientId',

            onDelete  :"cascade"

        }),

        clinicPatient.belongsTo(model.clinic,{

            foreignKey : 'clinicId',

            onDelete : "cascade"

        })

    }

    return clinicPatient;

}