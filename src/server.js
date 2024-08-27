require("dotenv").config();

const express = require("express");
const app = express();
const router = require('./routes')
const dbConnection = require('./database/sqlite')

//#region Express App Configs

dbConnection()
//Configures the application to accept and process JSON data in the body of incoming requests.
app.use(express.json())

app.use(router)

app.listen(process.env.SERVER_PORT, () => console.log(`Server ON: http://locahost:${process.env.SERVER_PORT}`))

//#endregion


