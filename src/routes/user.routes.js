const controller = require('../controllers/user.controller');
const verify = require('../middleware/token')

module.exports = (app) => {
    app.post('/user',controller.create);
    app.get('/users', controller.selectAll);
    app.get('/user/:id', controller.selectById);
    app.delete('/user/:id', controller.delete);
    app.put('/user/:id', controller.update);
    app.post("/register", controller.register);
    app.post('/login', controller.login);
}