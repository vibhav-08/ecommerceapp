// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('ecommerceapp', 'root', 'vibhav@03', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// try {
//     sequelize.authenticate();
//     console.log('Connected to local MySQL server');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// module.exports = sequelize;

var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vibhav@03',
    database: 'ecommerceapp'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

module.exports = connection;