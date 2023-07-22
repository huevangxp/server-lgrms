const controller = require('../controllers/office.cotroller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/office',verifyToken, controller.create);
    app.get('/office/:id', controller.get_all_by_id);
    app.delete('/office/:id', controller.deleteData);
    app.put('/office/:id', controller.updateData);
    app.get('/get-office-report/:id', controller.getOfficeToReport);
}