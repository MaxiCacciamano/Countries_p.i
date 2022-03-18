
const {DataTypes} = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define('activity',{
        id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.ENUM('1','2','3','4','5')
        },
        duration: {
            type: DataTypes.INTEGER
        },
        season:{
            type: DataTypes.STRING
        },
        createdInDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
    })
}