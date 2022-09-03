const express = require("express");
const config = require("./config.json");
const cors = require("cors");
const mongoose = require('mongoose');
const router = require('./routers/router');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: `http://localhost:${config.client.port}`,
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});
const Websocket = require('./websocket/index');

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${config.client.port}`);
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    next();
});

const start = async () => { 
    try {
        await mongoose.connect(`mongodb+srv://admin:admin@cluster0.7ffvmej.mongodb.net/?retryWrites=true&w=majority`);
        server.listen(config.server.port, () => {
            console.log(`http://localhost:${config.server.port}`);
        });
        Websocket.main(io);
    } catch (e) {   
        console.error('error');
    }   
  };
  
start();