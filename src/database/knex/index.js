const knex = require("knex")
//Connection config object created in Knexfile.js
const config = require("../../../knexfile")


//The Knex must receive a config object to establish the database connection.
const knexConnection = knex(config.development);


module.exports = knexConnection;