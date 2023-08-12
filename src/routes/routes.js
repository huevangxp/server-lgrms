const express = require('express');
const router = express.Router();

// import file
const departmentOrganizationMemberRoute = require('./department_orginazation_member.routes');
const departmentOrganizationRoute = require('./department.organization.routes');
// const departmentForeignRoute = require('./department.foreign.routes');
const departmentPrepareRoute = require('./department.prepare.routes'); 
const departmentMenberRoute = require('./department.menber.routes');
const rarul_departments = require('./province_department.routes');
const officeMemberRoutes = require('./office.member.routes');
const sectorMemberRoute = require('./sector.member.routes');
const unitMemberRoute = require('./unit.member.routes');
const provinceRoute = require('./province.routes');
const ministryRoute = require('./ministry.routes');
const department = require('./department.routes');
const addressRoute = require('./address.routes');
const office = require('./office.model.routes');
const sectorRoute = require('./sector.routes');
const roleRoute = require('./roles.routes');
const district = require('./district.routes');
const prepare_department = require('./prepare.department.routes');
const employees = require('./employee.routes');
const report = require('./report.routes');
const userRoute = require('./user.routes');
const unit = require('./unit.routes');
const memberRoute = require('./member.routes');

//use file
departmentOrganizationMemberRoute(router);
departmentOrganizationRoute(router);
// departmentForeignRoute(router);
employees(router);
report(router);
roleRoute(router);
prepare_department(router);
departmentPrepareRoute(router);
departmentMenberRoute(router);
sectorMemberRoute(router);
memberRoute(router);
rarul_departments(router);
unitMemberRoute(router);
officeMemberRoutes(router);
ministryRoute(router);
provinceRoute(router);
addressRoute(router);
sectorRoute(router);
department(router);
userRoute(router);
district(router);
office(router);
unit(router);

// export router
module.exports = router;
