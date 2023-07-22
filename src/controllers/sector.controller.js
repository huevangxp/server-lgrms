const Sector = require('../models/sector.model');
const sequelize = require("../configs/db");
const { QueryTypes } = require("sequelize");


exports.create = async (req, res) => {
  const user = req.payload;
  try {
    const { rarul_department_id, sector_title } = req.body;
    const prepare = {
      rarul_department_id:rarul_department_id,
      sector_title:sector_title,
      user_id:user.id
    }
    await Sector.create(prepare).then((success) => {
      if(success) {
        return res.status(200).json(success)
      } else {
        return res.status(404).json({message:"Faild"})
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sector' });
  }
}

exports.select = async (req, res) => {
  try {
   
    const sectors = await Sector.findAndCountAll();
    res.status(200).json(sectors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
};

exports.selectById = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `
      SELECT pd.id AS rarul_department_id, st.id as id, st.sector_title, st.created_at
      FROM province_departments pd
      INNER JOIN sectors st ON pd.id = st.rarul_department_id
      WHERE pd.id = '${id}'
    `;
    const data = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
    if (!data) {
      return res.status(404).json({ message: "ບໍ່ມີຂໍ້ມູນ" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message:error.message});
  }
};

exports.getSectorToReport = async (req, res) => {
  const { id } = req.params;
  try {
    const data = Sector.findAndCountAll({ where: { user_id: id } })
    
    if (!data) {
      return res.status(404).json({ message: 'this data not found'})
    }

    return res.status(200).json(data)
    
  } catch (error) {
    return res.status(500).json({ message:error.message})
  }
}

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    let { department_foreign_id, user_id, sector_title } = req.body;

    delete user_id;
    delete department_foreign_id;

    const [updatedRowsCount, [updatedSector]] = await Sector.update(
      { department_foreign_id, sector_title },
      { where: { id }, returning: true }
    );

    if (updatedRowsCount > 0) {
      res.status(200).json({ sector: updatedSector });
    } else {
      res.status(404).json({ error: 'Sector not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update sector' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Sector.findByPk(id);
    if (!data) {
      return res.status(404).json({ message: "this sector not found" });
    }
    await data.destroy();
    res.status(200).json({ message: 'delete sector success' })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}