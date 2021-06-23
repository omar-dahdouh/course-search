function logout(req, res) {
    res.clearCookie('user_email');
    res.json({
        message: 'logged out successfully'
    })
};

module.exports = logout;
