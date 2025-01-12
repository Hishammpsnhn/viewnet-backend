const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token", token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded", decoded.username);
            req.headers['X-Username'] = decoded.username ?? '';
            req.headers['X-Authenticated'] = "true";
        } catch (err) {
            req.headers['X-Verified'] = "false";
        }
    } else {
        req.headers['X-Verified'] = "false";
    }
    next();
}

module.exports = authenticate;
