var connection = require('../mysqldb.js');

var createItemTable = `CREATE TABLE IF NOT EXISTS items (
    itemno INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    netquantity INT NOT NULL,
    companyemail VARCHAR(255) NOT NULL
)`;