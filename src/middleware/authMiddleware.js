const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('./../models/user')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(400).json({ message: 'Bad request' });
        } else {
            const decodedData = jwt.verify(token, secret);
            const user = User.findOne({ uuid: decodedData.uuid });
            if (!user) {
                res.status(400).json({ message: 'Bad request' });
            } else {
                req.user = decodedData;
                next()
            }
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Bad request' });
    }
}