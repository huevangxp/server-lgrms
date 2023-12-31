const controller = require('../controllers/department_orginazation_member.controller');
const verify = require('../middleware/token')

module.exports = (app) => {
    app.post('/create-member-organization/:id',verify ,controller.create);
    app.get('/get-organization-member/:id', controller.department_Organization_Member);
    app.get('/department-organizations-member/:id', controller.selectById);
    app.get('/select-all-report-dom', controller.selectAll);
    app.get('/getAllByUserIdToReport/:id', controller.getAllByUserIdToReport);
    app.delete('/department-organization-member/:id', controller.deleteData);
    app.put('/department-organization-member/:id', controller.updateData);
}