const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    password: 'Agricur',
    host: 'localhost',
    port: 5432,
    database: 'Agricur'
})

module.exports = pool;

