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

                type: DataTypes.STRING,

            },

            gender: {

                type: DataTypes.STRING(256),

            },

            phoneNumber: {

                type: DataTypes.STRING(256),

                unique: {

                    args: 'phoneNumber',

                    msg: 'The phoneNumber is already taken!',

                },

            },

            passwordResetToken: {

                type: DataTypes.STRING(191),

            },

            profileImage: {

                type: DataTypes.STRING,

                set(val) {

                    let tmpStr = val;

                    tmpStr = tmpStr.replace(/\\/g, '/');

                    this.setDataValue('profileImage', tmpStr);

                },

            },

        },{

            underscored: true,

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