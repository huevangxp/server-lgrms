const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const AdminSecond = sequelize.define('admin_second', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    text: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    admin_id: {
        type: DataTypes.STRING
    },
    profile: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    pid: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue:'0'
    }
}, { timestamps: true })

module.exports = AdminSecond;