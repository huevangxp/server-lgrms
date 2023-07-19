const { DataTypes } = require("sequelize"); // ພະແນກ
const sequelize = require("../configs/db");

const Department = sequelize.define(
  "department",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    department_organization_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    department_title: {
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
  }
);

module.exports = Department;
