const register = require('./register');
const login = require('./login');
const emailAccept = require('./emailAccept');

class Controller {
    async register(req, res) {
      return await register(req, res);
    }
    async login(req, res) {
      return await login(req, res);
    }
    async emailAccept(req, res) {
        return await emailAccept(req, res);
    }
}

module.exports = new Controller();