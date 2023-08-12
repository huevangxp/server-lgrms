const controller = require('../controllers/employee.controller');
const verifyToken = require('../middleware/token');

module.exports = (app) => {
    app.post('/employee',verifyToken, controller.create);
    app.get('/employee', controller.selectAll);
    app.put('/update-employee/:id', controller.updateData);
    app.get('/employee-one/:id', controller.selectById);
    app.delete('/delete-employee/:id', controller.deleteData);
    app.get('/get-employee-userId/:id', controller.getAllById)
}