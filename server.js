const express = require("express")
const session = require("express-session")
const knexSessionStore = require("connect-session-knex")(session)
const router = require("./routes/router")
const dbConfig = require("./data/dbConfig")

const server = express()

server.use(express.json())

server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
    store: new knexSessionStore({
        knex: dbConfig,
        createtable: true
    })
}))
server.use('/api', router)

module.exports = server;

