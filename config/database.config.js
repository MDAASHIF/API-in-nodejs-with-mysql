require('dotenv').config();

const mysql = require('mysql');

let con = mysql.createConnection({
   host : process.env.DBHOST,
   user : process.env.DBUSER,
   database : process.env.DBNAME,
   password : ''
});

con.connect(function(error){
    if(error) throw error;
    console.log('connected');
});

module.exports = con;