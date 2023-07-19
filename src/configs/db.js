const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('lao-grms', 'postgres', 'huevang', {
    host: 'localhost',
    dialect: "postgres",
    post: 5432,
    logging: false
})

sequelize.authenticate().then(() => {
    console.log("Server connected database successfully...");
}).catch((err) => {
    console.log(err);
})

sequelize.sync();
module.exports = sequelize;