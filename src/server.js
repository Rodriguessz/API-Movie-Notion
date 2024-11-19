
require("express-async-errors")
require('dotenv/config')

const express = require("express");
const cors = require('cors');

const router = require('./routes')
const uploadConfigs = require("./config/upload");
const dbConnection = require('./database/sqlite');
const errorCatcher = require("./utils/ErrorCatcher")

const app = express();

//#region Express App Configs
dbConnection()

//Allows requests from different origins
app.use(cors());

//Configures the application to accept and process JSON data in the body of incoming requests.
app.use(express.json())


app.use("/files", express.static(uploadConfigs.UPLOAD_FOLDER))
app.use(router)


 
//Middleware to error treatment on application. It catches the errors that ocurred anywhere on the app
app.use((error, request, response, next) => {errorCatcher(error,request, response, next)});

app.listen(process.env.SERVER_PORT || 3333, () => console.log(`Server ON: http://localhost:${process.env.SERVER_PORT}`))

//#endregion


