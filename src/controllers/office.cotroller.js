const office = require("../models/office.model");
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");
// create Rarul
exports.create = async (req, res) => {
  try {
    const user = req.payload.id;
    const { district_id, title } = req.body;
    const prepare = {
        district_id: district_id,
      title: title,
      user_id: user,
    };
    await office
      .create(prepare)
      .then((data) => {
        if (data) {
          return res.status(201).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all
exports.get_all_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
         select dt.id as district_id,of.title as office_title,of.id as id , dt.title as district_title from districts dt
         inner join offices of on dt.id = of.district_id
         where dt.id = '${id}'
        `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (!data) {
      return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await office.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ message: "Deleted" });
      } else {
        return res.status(404).json({ message: "CAN'T NOT DELETED" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const data = await office.findByPk(id);
    if (!data) {
      return res.status(404).json({message: 'this data not cant update'})
    }
    await data.update({ title: title });
    return res.status(200).json({message: 'updated successfully'})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getOfficeToReport = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await office.findAndCountAll({ where: { user_id: id } });
    if (!data) {
      return res.status(404).json({ message: 'Invalid'})
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message:error.message})
  }
}
