const controller = require('../controllers/member.controller');
const verifyToken = require('../middleware/token');

module.exports = (app) => {
    app.post('/create-member', verifyToken ,controller.createMember);
    app.get('/get-all-member', controller.getAllMembers);
    app.get('/get-one-member/:id', controller.getMemberById);
    app.delete('/delete-member-prepare/:id', controller.deleteMember);
    app.put('/update-member/:id', controller.updateMember);
}