const { Op } = require('sequelize');
const Member = require('../models/member.model');

exports.createMember = async (req, res) => {
    try {
        // console.log(req.body);
        const id = req.payload.id;
        const { name, last_name, email, phone, address, profile, position, details, db_status } = req.body;
        const data = {
            name,
            last_name,
            email,
            phone,
            address,
            profile,
            position,
            db_status,
            details,
            user_id: id

        }
        const newMember = await Member.create(data);
        return res.status(201).json(newMember);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Read all members
exports.getAllMembers = async (req, res) => {
    try {
        const status = req.query.status;
        const id = req.query.userId;
        console.log(id);
        const members = await Member.findAll({
            where: {
              [Op.and]: [
                { status },
                { user_id: id }
              ]
            }
        });
        if (!members) {
            return res.status(404).json({message: "this item not found"})
        }
        return res.json(members);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Read a specific member by ID
exports.getMemberById = async (req, res) => {
    const memberId = req.params.id;
    try {
        const member = await Member.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        return res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch member' });
    }
};

// Update a member by ID
exports.updateMember = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Member.findByPk(id);
        if (!data) {
            return res.status(404).json({ message: "Invalid Data" })
        }
        await data.update({ ...req.body });
        return res.status(200).json({ message: "Member updated successfully" })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update member' });
    }
};

// Delete a member by ID
exports.deleteMember = async (req, res) => {
    const memberId = req.params.id;
    try {
        const data = await Member.findByPk(memberId);

        if (!data) {
            return res.status(404).json({ message: 'this data not found' })
        }
        await data.destroy();
        return res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete member' });
    }
};