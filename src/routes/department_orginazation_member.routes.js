const controller = require('../controllers/department_orginazation_member.controller');
const verify = require('../middleware/token')

module.exports = (app) => {
    app.post('/create-member-organization',verify ,controller.create);
    app.get('/get-organization-member/:id', controller.department_Organization_Member_department);
    app.get('/department-organizations-member/:id', controller.selectById);
    app.delete('/department-organization-member/:id', controller.deleteData);
    app.put('/department-organization-member/:id', controller.updateData);
}