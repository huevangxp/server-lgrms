var laoAddress = require("@lailao10x/lao-address")

exports.allProvince = async (req, res) => {
    try {
        let options = {
            province: "all"
        }
        
        const provinces = await laoAddress(options)
        res.status(200).json(provinces)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.allCity = async (req, res) => {
    const { id } = req.params;
    try {
        let options = {
            province: id,
            district: 'all'
        }
        const district = await laoAddress(options);
        res.status(200).json(district)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.allVillage = async (req, res) => {
    const { id } = req.params;
    try {
        
        let options = {
            // province: pid,
            district: id,
            village:"all"
        }

        const village = await laoAddress(options);
        res.status(200).json(village)
    } catch (error) {
        return res.status(500).json({ message: message.error });
    }
}