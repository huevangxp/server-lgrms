const DepartmentPrepare = require('../models/department.prepare.model');

exports.createDepartment = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            db_status: req.body.db_status,
            user_id: req.payload.id
        }
      const newDepartment = await DepartmentPrepare.create(data);
      return res.status(201).json(newDepartment);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create department' });
    }
  };
  
  // Read all departments
  exports.getAllDepartments = async (req, res) => {
    try {
      const status = req.query.status;
      const departments = await DepartmentPrepare.findAll({where:{db_status: status}});
      return res.status(200).json(departments);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch departments' });
    }
  };
  
  // Read a specific department by ID
  exports.getDepartmentById = async (req, res) => {
    const departmentId = req.params.id;
    try {
      const department = await DepartmentPrepare.findByPk(departmentId);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      return res.status(200).json(department);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch department' });
    }
  };
  
  // Update a department by ID
  exports.updateDepartment = async (req, res) => {
    const departmentId = req.params.id;
    try {
        const data = await DepartmentPrepare.findByPk(departmentId);
        if (!data) {
            return res.status(404).json({ message: 'Department not found' });
        }
        await data.update({ ...req.body });

      return res.status(201).json({message: 'Department successfully updated'});
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update department' });
    }
  };
  
  // Delete a department by ID
  exports.deleteDepartment = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await DepartmentPrepare.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Department not found' });
        }
        await data.destroy();
        await DepartmentPrepare.findAll();
      return res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete department' });
    }
  };
  