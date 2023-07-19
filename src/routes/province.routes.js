const controller = require("../controllers/province.controller");
const verifyToken = require("../middleware/token")

module.exports = (app) => {
    app.get('/province/:id', controller.selectById);
    app.delete('/province/:id', controller.delete);
    app.put('/province/:id', controller.update);
    app.get('/province', controller.selectAll);
    app.post('/province',verifyToken, controller.create);
}