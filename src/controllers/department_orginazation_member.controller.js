const Department_Organization_Member = require("../models/department_orginazation_member.model");
const sequelize = require("../configs/db");
const { QueryTypes, where } = require("sequelize");
exports.create = async (req, res) => {
  const user = req.payload.id;
  try {
    const {
      department_organization_member_id,
      name,
      last_name,
      profile,
      phone,
      details,
      position,
      address,
    } = req.body;

    await Department_Organization_Member.create({
      department_organization_member_id,
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
exports.department_Organization_Member_department = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
     select dot.id,dotm.id as d_o_m_id,dotm.name,dotm.last_name ,
     dotm.profile,dotm.phone,dotm.position,dotm.address,dotm.details
     from department_organizations dot
     inner join department_organization_members dotm 
     on dot.id = dotm.department_organization_member_id 
     where dot.id = '${id}'
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

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, profile, phone, position, address, details } =
      req.body;
    const prepareData = {
      name: name,
      last_name: last_name,
      profile: profile,
      phone: phone,
      position: position,
      address: address,
      details: details,
    };
    await Department_Organization_Member.update(prepareData, { where: { id: id } }).then(
      (updated) => {
        if (updated) {
          return res.status(200).json({ message: "Updated" });
        } else {
          return res.status(404).json({ message: "can not update" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the department member" });
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
