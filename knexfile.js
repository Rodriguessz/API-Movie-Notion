//Config file for Knex.js

const path = require('path')

module.exports = {

//#region Development Enviroment Configs 
development: {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db")
  },

  //Local where the migration files must be created and located.
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  },

  //Pool - Receive subattributes that are able to execute callbacks. The property runs when a database connection opened. 
  pool: {
    //Once the connection is established, allows the database to execute cascade functions.
    afterCreate: (connection, callback) => {
      connection.run("PRAGMA foreign_keys = ON", callback)
    }
  },

  //Recomended config to sqlite
  useNullAsDefault: true
},
//#endregion



};
