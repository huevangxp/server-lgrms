const Rarul = require("../models/province_department.model");
const bcrypt = require("bcrypt")
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");
// create Rarul
exports.create = async (req, res) => {
  try {
    const user = req.payload.id;
    const { user_name, password, role, pid, title,profile,province_title, province_id } = req.body;
    const data = await Rarul.findOne({ where: { title } })
    if (data) {
      return res.status(404).json({ message: 'this data exist' })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    await Rarul.create({
      title,
      user_name,
      pid,
      profile,
      password: hashPassword,
      province_title,
      province_id,
      role,
      user_id: user,
    })

    return res.status(201).json({ message: 'created' })

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.select = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Rarul.findAndCountAll({ where: { province_id: id } });
    if (!data) {
      return res.status(404).json({ message: 'Invalide' })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.selectAll = async (req, res) => {
  try {
    const data = await Rarul.findAndCountAll({});
    if (!data) {
      return res.status(404).json({ message: 'Invalide' })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
exports.selectOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Rarul.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'this data not found' })
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// get all
exports.get_all_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
         select rd.id as id,province_id,pid, rd.id as rarul_departments,rd.title,rd.created_at from provinces pr 
         inner join province_departments rd on pr.id = rd.province_id
         where pr.id = '${id}'
        `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "NOT FOUND DATA" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// delete
exports.getToReport = async (req, res) => {
  const { id } = req.params;
  try {

    const data = Rarul.findAndCountAll({ where: { user_id: id } });
    if (!data) {
      return res.status(404).json({ message: 'this data not found' })
    }

    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Rarul.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Invalide' })
    }
    await data.destroy();
    return res.status(200).json({ message: 'delete success' })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get to report
// exports.getToReport = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const data = await 
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
// update
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, user_name, password, role } = req.body;
    const data = await Rarul.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: 'Invalide' })
    }
    const newPass = await bcrypt.hash(password, 10);
    const rural = {
      title,
      user_name,
      password: newPass,
      role
    }
    await data.update(rural);
    return res.status(200).json({ message: "update success" })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
