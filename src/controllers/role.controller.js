const Role = require('../models/roles.model');

exports.createRole = async (req, res) => {
    try {
        const { role } = req.body;
        
        const data = await Role.create({ role_title: role });

        return res.status(201).json(data)

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.selectRole = async (req, res) => {
    try {
        const data = await Role.findAll();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.selectRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Role.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Role not found' });

        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Role.findByPk(id);
        if (!data) {
            return res.status(404).json({message:'this role not found'})
        }
        await data.update({
            role_title : req.body.role_title
        })
        return res.status(200).json({message:'success'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Role.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Role not found' });
        }
        await data.destroy();
        return res.status(200).json({ message: 'delete success'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}