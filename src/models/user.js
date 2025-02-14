module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define(
        'user',
        {
            firstName: {
                type: DataTypes.STRING(256),
            },
            lastName: {
                type: DataTypes.STRING(256),
            },
            email: {
                type: DataTypes.STRING(256),
                unique: true
            },
            password: {
                type: DataTypes.STRING(500),
            },
            phoneNumber: {
                type: DataTypes.STRING(256),
            },
            passwordResetToken: {
                type: DataTypes.STRING(191),
            },
            token:{
                type:DataTypes.STRING(1500),
                allowNull:true,
                trim:true
            },
            profileImage: {
                type: DataTypes.STRING,
                set(val) {
                    let tmpStr = val;
                    tmpStr = tmpStr.replace(/\\/g, '/');
                    this.setDataValue('profileImage', tmpStr);
                },
            },  
        },
        {
            timestamps: false,
            underscored: true
        }
    );

    user.addScope('userRole', (data) => ({
        include: [
            {
                model: sequelize.models.userRole,
                required: true,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: sequelize.models.role,
                        where: data.whereRole,
                        required: true,
                        // attributes: { exclude: ['createdAt', 'updatedAt'] },
                    },
                ],
            },

            // {

            //     model: sequelize.models.userAddress,

            //     attributes: { exclude: ['createdAt', 'updatedAt'] },

            // },

        ],

    }));

    user.associate = (models) => {
        user.hasOne(models.userRole, { foreignKey: 'userId', onDelete: 'cascade' });
    }

    return user;

}