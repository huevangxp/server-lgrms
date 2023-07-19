const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const DepartmentForeign = sequelize.define('department-foreign', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    province_id: {
        type: DataTypes.UUID,
        allowNull:null
    },
    user_id: {
        type:DataTypes.STRING,
        allowNull:false
    },
    department_foreign_title: {
        type: DataTypes.STRING,
        allowNull:null
    },
}, { sequelize, timestamps: true })

module.exports = DepartmentForeign;