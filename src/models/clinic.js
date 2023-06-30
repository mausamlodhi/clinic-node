module.exports = (sequelize, DataTypes) => {
    const clinic = sequelize.define("clinic", {
        name: {
            type: DataTypes.STRING(255),
            required: true,
            trim: true,
            unique: true,
        },
        contact: {
            type: DataTypes.STRING(13),
            required: true,
            trim: true,
            unique: true
        },
        address: {
            type: DataTypes.STRING(255),
            required: true,
            trim: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        password: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false
        },

        image: {
            type: DataTypes.STRING(255),
            trim: true,
            unique: true
        },
    },
        {
            timestamps: false,
            underscored: true,
        }
    );
    clinic.associate = (models) => {
        clinic.hasMany(models.patient, {
            foreignKey: 'clinic_id',
        });
        clinic.hasMany(models.patient, {
            foreignKey: "id",
            onDElete: "cascade"
        })
        clinic.hasMany(models.appointment, {
            foreignKey: "clinicId",
            onDelete: "cascade"
        })
    }
    return clinic;
}