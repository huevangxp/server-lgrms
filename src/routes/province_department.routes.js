const controller = require('../controllers/province_departments.controller');
const verifyToken = require('../middleware/token')
module.exports = async (app) => {
    app.post('/rarul_department', verifyToken,controller.create);
    // app.get('/rarul_department/:id', controller.get_all_by_id);
    app.get('/rarul_department/:id', controller.select);
    app.get('/rarul_department', controller.selectAll)
    app.get('/rarul_departmentOne/:id', controller.selectOne);
    app.put('/update-rural/:id', controller.updateData);
    app.delete('/delete-rural/:id', controller.deleteData);
}