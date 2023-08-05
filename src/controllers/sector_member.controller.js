const Member = require("../models/member.model");
const SectorMember = require("../models/sector_member.model");

exports.create = async (req, res) => {
    const { id } = req.params;
    const user = req.payload.id;
    try {
        const {
            sector_id,
            name,
            last_name,
            profile,
            phone,
            details,
            position,
            address,
        } = req.body;

        await SectorMember.create({
            sector_id,
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
                Member.update({status:'1'},{ where: { id: id }}) 
                return res.status(201).json(data);
            })
            .catch((error) => {
                return res.status(404).json({ message: error.message });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create a new department member" });
    }
};

exports.selectAllData = async (req, res) => {
    try {

        const data = await SectorMember.findAndCountAll({});
        if (!data) {
            return res.status(404).json({message:"Invalid SectorMember"})
        }

        return res.status(200).json(data)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getToReportAll = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await SectorMember.findAndCountAll({ where: { user_id: id } });
        if (!data) {
            return res.status(404).json({ message: 'this table do not exist' })
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getSectorAllById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await SectorMember.findAndCountAll({ where: { sector_id: id } });
        if (!data) {
            return res.status(404).json({ message: 'this table do not exist' })
        }
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.selectById = async (req, res) => {
    try {
        const { id } = req.params;
        await SectorMember.findAll({ where: { id: id } })
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
        res.status(500).json({ error: "Failed to retrieve the department member" });
    }
};

exports.updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, last_name, profile, phone, position, address, details } = req.body;
        const data = await SectorMember.findByPk(id);
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
        const rowsDeleted = await SectorMember.destroy({ where: { id: id } });
        if (!rowsDeleted) {
            return res.status(404).json({ error: "Department member not found" });
        }
        res.json({ message: "Department member deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the department member" });
    }
};

exports.getAllByUserIdToReport = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await SectorMember.findAndCountAll({ where: { user_id: id } });
        if (!data) {
            return res.status(404).json({ message: "this data not found" })
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
