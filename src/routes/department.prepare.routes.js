const controller = require('../controllers/department.prepare.controller');
const verifyToken = require('../middleware/token');

module.exports =  (app) => {
    app.post('/create-department-prepare',verifyToken, controller.createDepartment);
    app.get('/get-all-department-prepare', controller.getAllDepartments);
    app.get('/get-one-department-prepare/:id', controller.getDepartmentById);
    app.put('/update-department-prepare/:id', controller.updateDepartment);
    app.delete('/delete-department-prepare/:id', controller.deleteDepartment);
}