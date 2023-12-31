const controller = require('../controllers/ministry.controller');
const verify = require("../middleware/token");

module.exports = (app) => {
    app.post('/ministry',verify, controller.create);
    app.post('/signIn-ministry', controller.signIn);
    app.get('/ministry',verify,controller.selectAll);
    app.get('/ministry/:id',verify,controller.selectById);
    app.get('/ministryData', verify, controller.selectAllData);
    app.put('/update-ministry/:id', controller.update);
    app.delete('/ministry/:id', controller.delete);
    // app.get('/report-rural', controller.report_all_data);
}