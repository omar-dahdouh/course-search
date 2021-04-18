const connection = require('../config/connection');

module.exports = (source) =>
    connection.query({
        text: 'DELETE FROM course WHERE source = $1;',
        values: [source],
    });
