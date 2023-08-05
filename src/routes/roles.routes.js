const controller = require('../controllers/role.controller');

module.exports = (app) => {
    app.post('/create-role', controller.createRole);
    app.get('/select-roles', controller.selectRole);
    app.get('/select-role/:id', controller.selectRoleById);
    app.put('/update-role/:id', controller.updateRole);
    app.delete('/delete-role/:id', controller.deleteRole);
}