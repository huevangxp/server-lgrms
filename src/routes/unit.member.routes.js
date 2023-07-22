const controller = require('../controllers/unit.member.controller');
const verifyToken = require('../middleware/token');

module.exports = (app) => {
    app.post('/create-unit-member', verifyToken, controller.create);
    app.get('/get-unit-all-byId/:id', controller.getSectorAllById);
    app.get('/get-unit-one/:id', controller.selectById);
    app.put('/update-unit-member/:id', controller.updateData);
    app.delete('/delete-unit-member/:id', controller.deleteData);
    app.get('/unit-member-report/:id', controller.getUnitMemberReport);
}