const controller = require('../controllers/district.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/district', verifyToken, controller.create);
    app.get('/select-all-city', controller.selectAllData);
    app.get('/district/:id', controller.get_all_by_id);
    app.delete('/district/:id', controller.deleteData);
    app.put('/district/:id', controller.updateData);
    app.get('/getToReport/:id', controller.getAllToReports);
    app.get('/get-pid-city/:id', controller.getPidCity);
}