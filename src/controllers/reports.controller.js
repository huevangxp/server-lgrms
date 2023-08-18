const DepartmentOrganization = require("../models/department.organization.moldel");
const Ministry = require("../models/ministry.models");
const Department = require('../models/department.model');
const { QueryTypes } = require("sequelize");
const sequelize = require("../configs/db");



exports.report_rural = async (req, res) => {
    try {
        const ministries = await Ministry.findAll(); // Fetch all ministries

        const results = await Promise.all(
            ministries.map(async (ministry) => {
                const dpos = await DepartmentOrganization.findAll({ where: { ministry_id: ministry.id } });

                const dpoPromises = dpos.map(async (dpo) => {
                    const departments = await Department.findAll({ where: { department_organization_id: dpo.id } });
                    return {
                        dpo: dpo,
                        departments: departments
                    };
                });

                const dpoResults = await Promise.all(dpoPromises);
                
                return {
                    ministry: ministry,
                    dpos: dpoResults
                };
            })
        );

        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// ministry
exports.getAllReportDepartment = async (req, res) => {
    try {
     const sql = `select id, department_organization_id, department_title from departments`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
exports.getAllReportDepartmentOrganization = async (req, res) => {
    try {
     const sql = `select id, ministry_id, department_organization_title from department_organizations`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
exports.getAllReportMinistry = async (req, res) => {
    try {
     const sql = `select id, ministry_title from ministries`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

exports.getAllEmployeeReport = async (req, res) => {
    try {
     const sql = `select id, from_db_id, name, last_name ,position from employees`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
        return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // province

  exports.getAllReportProvince = async (req, res) => {
    try {
     const sql = `select id, province_title, pid from provinces`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}
exports.getAllReportProvinceDepartment = async (req, res) => {
    try {
     const sql = `select id, province_id , province_title, title from province_departments`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
exports.reportSector = async (req, res) => {
    try {
     const sql = `select id, rarul_department_id, sector_title from sectors`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // district
  exports.reportAllCities = async (req, res) => {
    try {
     const sql = `select id, province_id, pid, title from districts`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  exports.getAllOffices = async (req, res) => {
    try {
     const sql = `select id, city_id, province_department_id, title from offices`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  exports.getAllUnit = async (req, res) => {
    try {
     const sql = `select id,office_id, title from units`
      const data = await sequelize.query(sql, { type: QueryTypes.SELECT });
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }