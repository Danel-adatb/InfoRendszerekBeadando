const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.get('Authorization');

    if(!header) {
        const error = new Error('Not Authenticated');
        throw error;
    }

    const token = header.split(' ')[1];
    let decodeToken;

    try {
        decodeToken = jwt.verify(token, 'secretfortoken');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }

    if(!decodeToken) {
        const error = new Error('Not Authenticated');
        throw error;
    } 

    req.isLoggedIn = true;
    req.id = decodeToken.id;
    req.email = decodeToken.email;
    req.role = decodeToken.role;
    next();
}