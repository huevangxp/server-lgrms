const Department_Organization_Member = require("../models/department_orginazation_member.model");
const User = require('../models/user.model');
const moment = require('moment');
const sequelize = require("../configs/db");
const { QueryTypes, where } = require("sequelize");
exports.create = async (req, res) => {
  const user = req.payload.id;
  try {
    const {
      department_organization_id,
      name,
      last_name,
      profile,
      phone,
      details,
      position,
      address,
    } = req.body;

    await Department_Organization_Member.create({
      department_organization_id,
      name,
      last_name,
      profile,
      phone,
      position,
      address,
      details,
      user_id: user,
    })
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new department member" });
  }
};
// join department and deparment-menber
exports.department_Organization_Member = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Department_Organization_Member.findAndCountAll({ where: { department_organization_id: id } });
    if (!data) {
      return res.status(404).json({message:'this table do not exist'})
    }
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;
    await Department_Organization_Member.findAll({ where: { id: id } })
      .then((data) => {
        if (data.length > 0) {
          return res.status(200).json(data);
        }
      })
      .catch((error) => {
        return res.status(404).json({ message: error.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve the department member" });
  }
};
exports.selectAll = async (req, res) => {
  try {
    const startDate = req.query.start;
    const end = req.query.end;

    let formattedStartDate = moment(startDate).format("YYYY-MM-DD")

    // const data = {
    //   startDate: req.query.start,
    //   endDate: req.query.end
    // }

    // return res.send(data);

    const data = await Department_Organization_Member.findAll({where:{createdAt: formattedStartDate}});
    if (!data) {
      return res.status(404).json({message: "Couldn't find the department member"})
    }
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
}

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, profile, phone, position, address, details } = req.body;
    const data = await Department_Organization_Member.findByPk(id);
    if (!data) {
      return res.status(404).json({message: 'Invalid department'})
    }
    const prepareData = {
      name: name,
      last_name: last_name,
      profile: profile,
      phone: phone,
      position: position,
      address: address,
      details: details,
    };
    await data.update(prepareData);
    return res.status(200).json({message: 'update success'})
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:error.message});
  }
};

exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Department_Organization_Member.destroy({ where: { id: id } });
    if (!rowsDeleted) {
      return res.status(404).json({ error: "Department member not found" });
    }
    res.json({ message: "Department member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the department member" });
  }
};

exports.getAllByUserIdToReport = async (req, res) => {
  try {

    const { id } = req.params;

    const data = await Department_Organization_Member.findAndCountAll({ where: { user_id: id } });
    if (!data) {
      return res.status(404).json({ message:"this data not found"})
    }

    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ message:error.message });
  }
}
