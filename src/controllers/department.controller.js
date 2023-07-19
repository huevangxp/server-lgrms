const Department = require("../models/department.model");
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");

exports.create = async (req, res) => {
  const user = req.payload.id;
  try {
    const { department_organization_id, department_title } = req.body;
    await Department.create({
      department_organization_id,
      department_title,
      user_id: user
    })
      .then(() => {
        return res.status(201).json({ message: "Created" });
      })
      .catch((error) => {
        return res.status(400).json({ message:error.message});
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new department" });
  }
};

exports.selectAll = async (req, res) => {
  try {
    const departments = await Department.findAndCountAll();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve departments" });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      select dt.id as id, dto.id as department_organization_id, dto.department_organization_title, dt.department_title, dt.created_at from department_organizations as dto
       inner join departments as dt on dto.id = dt.department_organization_id where dto.id = '${id}'
    `

    const department = await sequelize.query(sql, { type: QueryTypes.SELECT });

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

   return res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const { department_title } = req.body;

    const result = await Department.findByPk(id);
    if (!result) {
      res.status(404).json({ message: "this user id" });
    }

    let data = req.body;
    delete data.user_id;
    delete data.department_organization_id;

    await result.update({
      department_title: department_title,
    });

    res.json({ message: "Department updated successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to update the department" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await Department.destroy({ where: { id } });

    if (!rowsDeleted) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the department" });
  }
};
