const controller = require('../controllers/department.organization.controller');
const verify = require('../middleware/token')

module.exports = (app) => {
    app.post('/department-organization',verify ,controller.create);
    app.get('/department-organization', controller.selectAll);
    app.get('/department-organizations/:id', controller.selectAllById);
    app.get('/department-organization/:id', controller.selectById);
    app.delete('/department-organization/:id', controller.delete);
    app.put('/department-organization/:id', controller.update);
}