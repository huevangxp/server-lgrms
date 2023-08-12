const controller = require('../controllers/reports.controller');

module.exports = (app) => {
    app.get('/report-rural', controller.report_rural);
    app.get('/department', controller.getAllReportDepartment)
    app.get('/departmentOga', controller.getAllReportDepartmentOrganization)
    app.get('/ministry', controller.getAllReportMinistry)
    app.get('/employee-report', controller.getAllEmployeeReport)
    // rural
    app.get('/reports-sector', controller.reportSector);
    app.get('/reports-provinces', controller.getAllReportProvince);
    app.get('/reports-provinces-department', controller.getAllReportProvinceDepartment);
    //city
    app.get('/reports-city', controller.reportAllCities);
    app.get('/reports-offices', controller.getAllOffices);
    app.get('/reports-units', controller.getAllUnit);

}