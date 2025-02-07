"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Define the database connection configuration
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE || 'your_database_name', // Database name
process.env.MYSQL_USER || 'your_user', // Database user
process.env.MYSQL_PASSWORD || 'your_password', // Database password
{
    host: process.env.MYSQL_HOST || 'mysql', // Use the service name 'mysql' as the host
    port: parseInt(process.env.MYSQL_PORT || '3306'), // Default MySQL port (parsed as a number)
    dialect: 'mysql', // Database dialect
    logging: console.log, // Enable logging (optional)
});
// Test the connection
sequelize.authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
