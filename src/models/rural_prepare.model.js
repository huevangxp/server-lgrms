const { DataTypes } = require("sequelize"); // ພະແນກ
const sequelize = require("../configs/db");

const RuralPrepare = sequelize.define(
  "rural_prepare",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      db_status: {
          type: DataTypes.STRING,
          allowNull: false,
    }
  },
  {
    sequelize,
  }
);

module.exports = RuralPrepare;
