const express = require("express");
const UserRouter = require("../userRouter");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/', UserRouter);

server.get('/', (req, res) => {
    res.status(200).json({api: "up"})
});










module.exports = server;
