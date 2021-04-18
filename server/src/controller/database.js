const { dbBuild } = require('../database/config/build')

async function build(req, res) {
    console.log('build');

    await dbBuild();

    res.json({
        message: 'build'
    })
};


module.exports = {
    build,
}
