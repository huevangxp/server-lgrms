const District = require("../models/district.model");
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");
// create Rarul
exports.create = async (req, res) => {
  try {
    const user = req.payload.id;
    const { province_id, title , pid} = req.body;
    const prepare = {
      province_id: province_id,
      pid,
      title: title,
      user_id: user
    };
    await District
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
exports.selectAllData = async (req, res) => {
  try {
    const data = await District.findAndCountAll({});
    if (!data) {
      return res.status(404).json({ message: 'Invalid' })
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// get all
exports.get_all_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    // const sql = `
    //      select pd.id as province_department_id,pd.title,
    //      pd.created_at,dt.id as id,dt.title as district_title
    //       from province_departments pd 
    //      inner join districts dt on pd.id = dt.province_id
    //      where pd.id = '${id}'
    //     `;
    // const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    const data = await District.findAll({where: {province_id: id}})
    if (!data) {
      return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete
exports.getAllToReports = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await District.findAll({ where: { pid: id } });
    // const sql = `
    //      select pd.id as province_department_id,pd.title,
    //      pd.created_at,dt.id as id,dt.title as district_title
    //       from province_departments pd 
    //      inner join districts dt on pd.user_id = dt.user_id
    //      where pd.user_id = '${id}'
    //     `;
    // const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (!data) {
      return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" });
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
}
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await District.findByPk(id)
    console.log(data);

    if (!data) {
      return res.status(404).json({ message: 'this data not found' });
    }

    await data.destroy();

   return res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

exports.getPidCity = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await District.findAll({ where: { pid: id } })
    if (!data) {
      return res.status(404).json({ message: 'Invalid'})
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// update
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title , office_title} = req.body;
    const data = await District.findByPk(id);
    if (!data) {
      return res.status(404).json({ message:"this data can not exist"})
    }
    await data.update({ title: title, office_title:office_title })
    return res.status(200).json({ message: "data updated successfully"})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
