const PrepareDepartment = require('../models/prepare_department.model');

exports.create = async (req, res) => {
    try {
        const { title, province_id } = req.body;
        const data = await PrepareDepartment.create({
            title: title,
           province_id 
        })
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.select = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await PrepareDepartment.findAll({ where: { province_id: id } });
        if (!data) {
            return res.status(200).json(data)
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await PrepareDepartment.findByPk(id);
        if (!data) {
            return res.status(404).json({message:'this data not found'})
        }
        await data.destroy()
        return res.status(200).json({message:'delete success'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.update = async (req, res) => {
    try {

        const { id } = req.params;
        const { title } = req.body;
        const data = await PrepareDepartment.findByPk(id);
        if (!data) {
            return res.status(404).json({message:'not found'})
        }
        await data.update({ title: title })
        return res.status(200).json({message:'success udate'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}