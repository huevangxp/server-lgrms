const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const DepartmentOrganization = sequelize.define('department_organization', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ministry_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      department_organization_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    {
      sequelize,
    })

module.exports = DepartmentOrganization;