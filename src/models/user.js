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
            profileImage: {
                type: DataTypes.STRING,
                set(val) {
                  let tmpStr = val;
                  tmpStr = tmpStr.replace(/\\/g, '/');
                  this.setDataValue('profileImage', tmpStr);
                },
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