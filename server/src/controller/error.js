function pageNotFound(req, res) {
    res.status(404).json({ message: 'Page Not Found' });
};
  
function serverError(err, req, res, next) {
    res.status(500).json({ message: 'Something Went Wrong' });
};

module.exports = {
    pageNotFound,
    serverError
}