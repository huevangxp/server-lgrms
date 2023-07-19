const controller = require('../controllers/office.cotroller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/office',verifyToken, controller.create);
    app.get('/office/:id', controller.get_all_by_id);
    // app.get('/address/city/:id', controller.allCity);
    // app.get('/address/village/:id', controller.allVillage);
}