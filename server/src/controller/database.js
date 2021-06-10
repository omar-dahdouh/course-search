const { dbBuild } = require('../database/config/build');

async function build(req, res) {
  try {
    await dbBuild();
    res.json({
      message: 'built successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to build',
    });
  }
}

module.exports = {
  build,
};
