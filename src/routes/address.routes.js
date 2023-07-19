const controller = require('../controllers/address.controller');

module.exports = async (app) => {
    app.get('/address/province', controller.allProvince);
    app.get('/address/city/:id', controller.allCity);
    app.get('/address/village/:id', controller.allVillage);
}