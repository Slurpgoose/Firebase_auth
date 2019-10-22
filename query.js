


const createUser = async (db, email, password) => {
    let user = {};
    user['id'] = await getMaxId(db, 'users');
    user['email'] = email;
    user['password'] = password
    console.log(user)
    return await InsertUser(db, 'users', user)
};

const getMaxId = async (db, table) => {
    return db.one(`SELECT max(id) as id FROM ${table}`)
    .then((id) => {
        return id.id
    })
    .catch((e) => {
        console.log(e);
    })
};

const InsertUser = async (db, table, data) => {
    console.log(data)
    return db.result(`INSERT INTO ${table} VALUES(${data.id + 1}, '${data.email}', '${data.password}')`)
        .then(() => {
            console.log(`SUCCESS ${data.email} added to the database`)
            return {SUCCESS: true, message: undefined}
        })
        .catch((e) => {
            console.log(e);
            return {SUCCESS: false, message: e}
        })
    }

module.exports = ([createUser])