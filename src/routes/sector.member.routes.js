const controller = require('../controllers/sector_member.controller');
const verifyToken = require('../middleware/token');

module.exports = (app) => {
    app.post('/create-sector-member', verifyToken, controller.create);
    app.get('/get-all-byId/:id', controller.getSectorAllById);
    app.get('/get-sector-one/:id', controller.selectById);
    app.get('/get-to-report-all/:id', controller.getToReportAll);
    app.put('/update-sector-member/:id', controller.updateData);
    app.delete('/delete-sector-member/:id', controller.deleteData);
}