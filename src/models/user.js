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
            specialization: {
                type: DataTypes.STRING(256),
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
            profileImageUrl: {
                type: DataTypes.VIRTUAL,
                // get() {
                //   const str = this.get('profileImage');
                //   if (!str || !utility.isFileExist(str)) {
                //     return defaultUserImage;
                //   }
                //   return (str && `${config.app.baseUrl}${str}`) || '';
                // },
            },
            userRole: {
                type: DataTypes.STRING(20)
            }
        },
        {
            
            timeStamps: false,
            underscored: true,
        }
    );
    return user;
}