const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Ministry = sequelize.define('ministry', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,    
    },
    user_id: {
        type:DataTypes.UUID,
        allowNull:false
    },
    ministry_title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull : false
    },
    profile: {
        type: DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    created_at:{
        type:DataTypes.DATE,
        defaultValue:sequelize.literal("NOW()")
    }
}, {
    sequelize,
})

module.exports = Ministry;