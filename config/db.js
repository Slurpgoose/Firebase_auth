const config = {
    host: 'localhost',
    port: 5432,
    database: 'spotcloud',
    user: 'antonytsygankov',
    password: ''
}

const pgb = 
    require('pg-promise')();
    const db = pgb(config);

module.exports = [db, pgb, config];