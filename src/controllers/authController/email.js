const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret } = require('../../config.json');
const AuthValidation = require('../../validation/auth');

const generateToken = (uuid) => {
    const payload = {
        uuid
    };
    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

module.exports = async function (req, res) {
    try {
      const { login, password } = req.body;

      const validation = AuthValidation.login(req);
      if (validation.valid === false)
      {
          return res.status(validation.code).json({message: validation.message});
      }

      const user = await User.findOne({login});

      if (!user) {
        return res.status(400).json({message: `Не верный логин или пароль`});
      }

      const Password = bcrypt.compareSync(password, user.password)

      if (!Password) {
        return res.status(400).json({message: `Не верный логин или пароль`});
      }

      const token = generateToken(user.uuid);
      
      return res.status(200).json({token, login: user.login});

    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Email invalid'});
    }
  }