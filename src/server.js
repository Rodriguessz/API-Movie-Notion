
require("express-async-errors")

const express = require("express");
const app = express();
const router = require('./routes')
const dbConnection = require('./database/sqlite');
const errorCatcher = require("./utils/ErrorCatcher")

//#region Express App Configs

dbConnection()
//Configures the application to accept and process JSON data in the body of incoming requests.
app.use(express.json())

app.use(router)


//Middleware to error treatment on application. It catches the errors that ocurred anywhere on the app
app.use((error, request, response, next) => {errorCatcher(error,request, response, next)});


app.listen(3333, () => console.log(`Server ON: http://locahost:3333`))

//#endregion


