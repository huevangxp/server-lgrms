const Employee = require("../models/employee.model");
// const Department = require('../models/ministry.models')
const User = require('../models/user.model');
const moment = require('moment');
const sequelize = require("../configs/db");
const { Op } = require("sequelize");
const Member = require("../models/member.model");

exports.create = async (req, res) => {

    try {
        const user = req.payload.id;
        const {
            from_db_id,
            name,
            last_name,
            level,
            table_name,
            profile,
            phone,
            details,
            position,
            address,
        } = req.body;

        await Employee.create({
            from_db_id,
            name,
            last_name,
            level,
            profile,
            phone,
            position,
            address,
            table_name,
            details,
            user_id: user,
        })
            .then((data) => {
                Member.update({ status: '1' }, { where: { id: id } })
                return res.status(201).json(data);
            })
            .catch((error) => {
                return res.status(404).json({ message: error.message });
            });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.selectById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Employee.findByPk(id);
        if (!data) {
            return res.status(404).json({message: 'this data not found'})
        }
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve the department member" });
    }
};
exports.selectAll = async (req, res) => {
    try {
        const id = req.query.id;
        const level = req.query.level;
        const table_name = req.query.table_name;

        const data = await Employee.findAll({
            where: {
                [Op.and]: [
                    { from_db_id: id },
                    { level: level },
                    { table_name: table_name }
                ]
            }
        });
        if (!data) {
            return res.status(404).json({ message: "Couldn't find the department member" })
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, last_name, profile, phone, position, address, level, details } = req.body;
        const data = await Employee.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'Invalid department' })
        }
        const prepareData = {
            name: name,
            last_name: last_name,
            profile: profile,
            phone: phone,
            position: position,
            address: address,
            details: details,
            level: level
        };
        await data.update(prepareData);
        return res.status(200).json({ message: 'update success' })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        // const rowsDeleted = await Employee.destroy({ where: { id: id } });
        const rowsDeleted = await Employee.findByPk(id);
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

exports.getAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Employee.findAll({ where: { user_id: id } });
        if (!data) {
            return res.status(404).json({message: 'this not found'})
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

