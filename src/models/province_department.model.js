const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Rarul = sequelize.define(
  "province_departments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    province_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue:'0',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  { sequelize }
);

module.exports = Rarul;
