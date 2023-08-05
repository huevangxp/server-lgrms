const controller = require('../controllers/prepare.department.controller');

module.exports = (app) => {
    app.post('/prepare-department', controller.create);
    app.get('/select-prepare-department/:id', controller.select);
    app.delete('/delete-prepare-department/:id', controller.delete);
    app.put('/update-prepare-department/:id', controller.update);
}