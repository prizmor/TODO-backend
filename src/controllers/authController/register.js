const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const AuthValidation = require('../../validation/auth');
const { v4: uuidv4 } = require('uuid');
const Mailer = require('../../mailer/index');
const randomstring = require("randomstring");

module. exports = async function (req, res) {
    try {

        const { login, password, email } = req.body;

        const validation = AuthValidation.register(req);
        if (validation.valid === false)
        {
            return res.status(validation.code).json({message: validation.message});
        }

        const candidate = await User.findOne({login});

        if (candidate) {
            return res.status(400).json({message: `Логин ${login} уже занят`});
        }

        const Password = bcrypt.hashSync(password, 7);
        const user = new User({ login: login, password: Password, email: email, uuid: uuidv4(), emailCode: randomstring.generate(6)});
        await Mailer.ConfirmedEmail(email, user.emailCode);
        await user.save();
        return res.status(200).json({message: 'OK'})
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Bad request'});
    }
}
