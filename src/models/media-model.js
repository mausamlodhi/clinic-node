module.exports = (sequelize, DataTypes) => {
    const media = sequelize.define('media', {
        name: {
            type: DataTypes.STRING(255)
        },
        basePath: {
            type: DataTypes.STRING(255)
        },
        baseUrl: {
            type: DataTypes.STRING(255)
        },
        mediaType: {
            type: DataTypes.STRING(100)
        },
        mediaFor: {
            type: DataTypes.ENUM(
                'patient',
                'admin',
                'staticBlock',
            )
        },
        fileType : {
            type : DataTypes.VIRTUAL,
            get(){
                const file = this.get('basePath');
                if(file){
                    const fileArray = file.split(".");
                    const ext = fileArray.pop();
                    return ext;
                }
                return null;
            }
        }
    },{
        underscored: true,
    });
    return media;
}