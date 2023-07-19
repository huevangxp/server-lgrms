const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Sector = sequelize.define(
  "sector",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rarul_department_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sector_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
        type:DataTypes.DATE,
        defaultValue:sequelize.literal("NOW()")
    },
  },
  { sequelize }
);

module.exports = Sector;
