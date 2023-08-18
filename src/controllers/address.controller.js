var laoAddress = require("@lailao10x/lao-address")

exports.allProvince = async (req, res) => {
    try {
        let options = {
            province: "all"
        }
        
        const provinces = await laoAddress(options)
       return res.status(200).json(provinces)
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
       return res.status(200).json(district)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.allVillage = async (req, res) => {
    const { id } = req.params;
    try {
        
        let options = {
            district: id,
            village:"all"
        }
        const village = await laoAddress(options);
        res.status(200).json(village)
    } catch (error) {
        return res.status(500).json({ message: message.error });
    }
}

exports.village = async (req, res) => {
    try {
        let options = {
            village: "all"
        };
        
        // Assuming `laoAddress` is an asynchronous function that returns an array of village data
        const villageData = await laoAddress(options);

        // Transform the villageData array into the desired format
        const village = villageData.map((res, index) => {
            return {
                ລຳດັບ: index + 1,
                ຊື່ລາວ: res.vn,
                ຊື່ອັງກິດ: res.vn_en,
            };
        });

        res.status(200).json(village);
    } catch (error) {
        // Handle errors properly, and use the correct property for the error message
        return res.status(500).json({ message: error.message });
    }
};