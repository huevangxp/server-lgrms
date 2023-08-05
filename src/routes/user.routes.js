const controller = require('../controllers/user.controller');
const adminController = require('../controllers/admin.second.controller');
const verify = require('../middleware/token')

module.exports = (app) => {
    app.post('/user',controller.create);
    app.get('/users', controller.selectAll);
    app.get('/user/:id', controller.selectById);
    app.delete('/user/:id', controller.delete);
    app.put('/user/:id', controller.update);
    app.post("/register", controller.register);
    app.post('/login', controller.login);
    app.post('/create-admin', adminController.create);
    app.post('/admin-signin', adminController.admin_login);
    app.get("/get-admin-second/:id", adminController.selectById);
    app.put('/admin-second-update/:id', adminController.admin_second_update);
    app.delete('/admin-second-delete/:id', adminController.admin_second_delete);
}