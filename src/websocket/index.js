const router = require("./router.js");
const { secret } = require("../config.json")
const jwt = require('jsonwebtoken');


class Websocket {

    io;
    sockets = [];

    main(io) {

        this.io = io;

        this.io.on("connection", async (socket) => {
            console.log("1");
            const data = jwt.verify(socket.handshake.auth.username, secret);
            
            this.sockets.push({ uuid: data.uuid, socket: socket, token: socket.handshake.auth.username});
            socket.on("disconnect", async () => {
                const index = this.sockets.findIndex(el => el.uuid == data.uuid);
                if (index > -1) { 
                    this.sockets.splice(index, 1);
                }
            });

            router(socket);
        });
    }
}


module.exports = new Websocket();