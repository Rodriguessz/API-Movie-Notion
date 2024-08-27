const { Router } = require('express');
const routes = Router();


//#region Tags Resource routes 

routes.get("/" , () => console.log("Tags controller"))

//#endregion


module.exports = routes;