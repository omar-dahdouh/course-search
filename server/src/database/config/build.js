require('env2')('../.env');
const fs = require('fs');
const { join } = require('path');

const connection = require('./connection');

async function dbBuild() {
    const path = join(__dirname, 'build.sql');
    const sql = (await fs.promises.readFile(path)).toString();

    return await connection.query(sql);
}

module.exports = {
    dbBuild,
};
