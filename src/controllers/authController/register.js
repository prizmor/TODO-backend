const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const AuthValidation = require('../../validation/auth')

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
    const user = new User({login: login, password: Password, email: email});

    await user.save();
    return res.status(200).json({message: 'OK'})
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Bad request'});
  }
}