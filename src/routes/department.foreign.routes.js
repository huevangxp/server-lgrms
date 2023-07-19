const controller = require('../controllers/department.foreign.controller');

module.exports = (app) => {
    app.post('/department-foreign', controller.create);
    app.get('/department-foreign', controller.selectAll);
    app.get('/department-foreign/:id', controller.selectById);
    app.delete('/department-foreign/:id', controller.delete);
    app.put('/department-foreign/:id', controller.update);
}