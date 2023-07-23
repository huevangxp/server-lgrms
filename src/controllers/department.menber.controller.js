const DepartmentMember = require("../models/department.menber.model");
const sequelize = require("../configs/db");
const { QueryTypes, where } = require("sequelize");
exports.create = async (req, res) => {
  const user = req.payload.id;
  try {
    const {
      department_id,
      name,
      last_name,
      profile,
      phone,
      details,
      position,
      address,
    } = req.body;

   const data = await DepartmentMember.create({
      department_id,
      name,
      last_name,
      profile,
      phone,
      position,
      address,
      details,
      user_id: user,
   })
     return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a new department member" });
  }
};
// join department and deparment-menber
exports.departmentMember_department = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
     select dt.id as department_id,dm.id as id,dm.name,dm.last_name,dm.profile,dm.phone,dm.position,
     dm.address,dm.details from departments dt 
     inner join department_members dm on dt.id = dm.department_id 
     where dt.id = '${id}'
    `;
    const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
    if (!data) {
    return res.status(404).json({message: 'Invalide'})
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectAll = async (req, res) => {
  try {
    // Retrieve all department members using the DepartmentMember model
    const departmentMembers = await DepartmentMember.findAndCountAll();

    res.status(200).json(departmentMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DepartmentMember.findByPk(id);
    if (!data) {
      return res.status(404).json({message: 'Invalid'})
    }

    return res.status(200).json(data)
      
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the department member" });
  }
};

exports.update = async (req, res) => {
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
    await DepartmentMember.update(prepareData, { where: { id: id } }).then(
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

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await DepartmentMember.findByPk(id);
    if (!rowsDeleted) {
      return res.status(404).json({ error: "Department member not found" });
    }
    await rowsDeleted.destroy();
    res.json({ message: "Department member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the department member" });
  }
};
