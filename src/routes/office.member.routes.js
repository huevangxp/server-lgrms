const controller = require('../controllers/office.member.controller');
const verifyToken = require('../middleware/token');

module.exports = (app) => {
    app.post('/create-office-member/:id', verifyToken, controller.create);
    app.get('/get-office-all-byId/:id', controller.getSectorAllById);
    app.get('/getAll', controller.allData);
    app.get('/get-office-one/:id', controller.selectById);
    app.put('/update-office-member/:id', controller.updateData);
    app.delete('/delete-office-member/:id', controller.deleteData);
    app.get("/get-office-member-report/:id", controller.getOfficeMemberReport);
}