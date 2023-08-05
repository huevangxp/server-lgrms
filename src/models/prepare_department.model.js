const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db')

const PrepareDepartment =  sequelize.define('prepare_department', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    province_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, { timestamps: true })

module.exports = PrepareDepartment;