const UnitMember = require('../models/unit.member.model');

exports.create = async (req, res) => {
    const user = req.payload.id;
    try {
        const {
            unit_id,
            name,
            last_name,
            profile,
            phone,
            details,
            position,
            address,
        } = req.body;

        await UnitMember.create({
            unit_id,
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
        res.status(500).json({ error: "Failed to create a new unit member" });
    }
};

exports.getSectorAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await UnitMember.findAndCountAll({ where: { unit_id: id } });
        if (!data) {
            return res.status(404).json({ message: 'this table do not exist' })
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllData = async (req, res) => {
    try {
        const data = await UnitMember.findAndCountAll({});
        if (!data) {
            return res.status(404).json({ message: 'No data found'})
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.selectById = async (req, res) => {
    try {
        const { id } = req.params;
        await UnitMember.findAll({ where: { id: id } })
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
        res.status(500).json({ error: "Failed to retrieve the unit member" });
    }
};

exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, last_name, profile, phone, position, address, details } = req.body;
        const data = await UnitMember.findByPk(id);
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
        const rowsDeleted = await UnitMember.destroy({ where: { id: id } });
        if (!rowsDeleted) {
            return res.status(404).json({ error: "unit member not found" });
        }
        res.json({ message: "unit member deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the department member" });
    }
};

exports.getUnitMemberReport = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await UnitMember.findAndCountAll({ where: { user_id: id } });
        if (!data) {
            return res.status(404).json({ message: "this data not found" })
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
