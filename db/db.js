
const { Pool } = require('pg'); 
const pool = new Pool({
    connectionString : "postgres://root:02REtWgf6YJbi3yIRaP2FCdPGlCBbQvO@dpg-ckrrns05vl2c738hpsv0-a.singapore-postgres.render.com/agricur_database",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;

