const User = require('../models/user');
const { sockets } = require('./index');
const { secret } = require("../config.json")
const jwt = require('jsonwebtoken');

const router = (socket) => {
    socket.on("ConfirmedEmail", async () => {
        const uuid = jwt.verify(socket.handshake.query.token, secret).uuid;
        const user = await User.findOne({ uuid: uuid });
        socket.emit("ConfirmedEmail", user.confirmedEmail);
    });
}

module.exports = router;