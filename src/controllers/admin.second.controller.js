const AdminSecond = require('../models/admin.second.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        const { title, text, admin_id, username, password, role, profile, pid } = req.body;
        const newPass = await bcrypt.hash(password, 10);
        await AdminSecond.create({
            title,
            text,
            admin_id,
            username,
            password: newPass,
            role,
            profile,
            pid
        })
        return res.status(201).json({message: 'success'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.admin_login = async (req, res) => {
    try {
        // return res.send(req.body)
        const { username, password } = req.body;
        const user = await AdminSecond.findOne({ where: { username: username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const checkPass = await bcrypt.compare( password, user.password);
        if (!checkPass) {
            return res.status(404).json({message: 'this user not found'})
        }
        const prepare_token = {
            // id: user.id,
            title:user.title,
            text:user.text,
            id: user.admin_id,
            username: user.username,
            password: user.password,
            role: user.role,
            profile: user.profile,
            pid: user.pid,
        }
        const token = await jwt.sign(prepare_token, process.env.SECRET_KEY, { expiresIn:'120d'})
        return res.status(200).json(token)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.selectById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AdminSecond.findAll({where:{admin_id: id}});
        if (!data) {
            return res.status(404).json({message:"not found"})
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.admin_second_update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AdminSecond.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: 'this use not found' })
        }
        const newPass = await bcrypt.hash(req.body.password, 10);
        await data.update({
            username: req.body.username,
            password: newPass
        })
        return res.status(200).json({ message: 'success update'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.admin_second_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AdminSecond.findByPk(id);
        if (!data) {
            return res.status(404).json({message: 'this item not found'})
        }
        await data.destroy();
        return res.status(200).json({message: 'delete success'})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}