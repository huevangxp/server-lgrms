const DepartmentForeign = require('../models/department.foreign.model');

exports.create = async (req, res) => {
  try {
    const { province_id, user_id, department_foreign_title } = req.body;
      
    // Create a new department foreign using the DepartmentForeign model
    const newDepartmentForeign = await DepartmentForeign.create({
      province_id,
      user_id,
      department_foreign_title,
    });

    res.status(201).json(newDepartmentForeign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new department foreign' });
  }
};

exports.selectAll = async (req, res) => {
  try {
    // Retrieve all department foreigns using the DepartmentForeign model
    const departmentForeigns = await DepartmentForeign.findAll();

    res.json(departmentForeigns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve department foreigns' });
  }
};

exports.selectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find a department foreign by its ID using the DepartmentForeign model
    const departmentForeign = await DepartmentForeign.findByPk(id);

    if (!departmentForeign) {
      return res.status(404).json({ error: 'Department foreign not found' });
    }

    res.json(departmentForeign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the department foreign' });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    let { province_id, user_id, department_foreign_title } = req.body;
      delete province_id;
      delete user_id;
    // Find the department foreign by its ID and update its properties using the DepartmentForeign model
    const rowsUpdated = await DepartmentForeign.update(
      {department_foreign_title },
      { where: { id } }
      );
      
    if (!rowsUpdated) {
      return res.status(404).json({ error: 'Department foreign not found' });
      }
      
      res.json({ message: 'Department foreign updated successfully' });
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the department foreign' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the department foreign by its ID using the DepartmentForeign model
    const rowsDeleted = await DepartmentForeign.destroy({ where: { id } });

    if (!rowsDeleted) {
      return res.status(404).json({ error: 'Department foreign not found' });
    }

    res.json({ message: 'Department foreign deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the department foreign' });
  }
};
