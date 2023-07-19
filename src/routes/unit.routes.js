const controller = require('../controllers/unit.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/unit',verifyToken, controller.create);
    app.get('/office-unit/:id', controller.get_all_by_id);
    app.delete('/office-unit/:id', controller.deleteData);
    // app.get('/address/village/:id', controller.allVillage);
}