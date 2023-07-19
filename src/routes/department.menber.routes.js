const controller = require('../controllers/department.menber.controller');
const verifyToken = require('../middleware/token')
module.exports = (app) => {
    app.post('/department-menber',verifyToken, controller.create);
    app.get('/department-menber', controller.selectAll);
    app.get('/department-member/:id', controller.selectById);
    app.delete('/department-member/:id', controller.delete);
    app.put('/department-member/:id', controller.update);
    app.get('/departmentMember_department/:id', controller.departmentMember_department);

}