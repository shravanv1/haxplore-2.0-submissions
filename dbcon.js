const mysql = require('mysql');

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trace'
});

db.connect((err) => {
    if(err)
    throw err;
});

module.exports = db;