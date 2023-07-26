const controller = require('../controllers/member.controller');

module.exports = (app) => {
    app.post('/create-member', controller.createMember);
    app.get('/get-all-member', controller.getAllMembers);
    app.get('/get-one-member/:id', controller.getMemberById);
    app.delete('/delete-member-prepare/:id', controller.deleteMember);
    app.put('/update-member/:id', controller.updateMember);
}