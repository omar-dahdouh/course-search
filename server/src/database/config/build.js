require('env2')('../.env');
const { readFileSync } = require('fs');
const fs = require('fs');
const { join } = require('path');

const connection = require('./connection');

async function dbBuild() {
    const path = join(__dirname, 'build.sql');
    const sql = fs.promises.readFile(path).toString();

    return connection.query(sql);
}

module.exports = dbBuild;
