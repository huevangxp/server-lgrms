const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    role_title: {
        type: DataTypes.STRING,
        allowNull:false,
    }
}, { timestamps: true });

module.exports = Role;