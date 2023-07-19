const controller = require('../controllers/department.controller');
const verifyToken = require('../middleware/token')

module.exports = (app) => {
    app.post('/department',verifyToken ,controller.create);
    app.get('/department', controller.selectAll);
    app.get('/select_all_department_id/:id', controller.selectById);
    app.delete('/department/:id', controller.delete);
    app.put('/department/:id', controller.update);
}