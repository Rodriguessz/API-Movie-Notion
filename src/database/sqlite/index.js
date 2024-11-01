const path = require("path")

//Database tha will be used in the project
const sqlite = require("sqlite")
//Database Driver/Version will be used.  
const sqlite3 = require("sqlite3")



//#region Sqlite Conncetion Configuration

const sqliteConnection = async () => {
    const database = await sqlite.open({
        //Local to create the database file
        filename: path.resolve(__dirname, "../", "database.db"),
        //Database driver
        driver: sqlite3.Database
    })
    return database
}

//#endregion


module.exports = sqliteConnection
