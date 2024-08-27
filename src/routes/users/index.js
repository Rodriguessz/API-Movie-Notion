const { Router } =  require('express')
const routes = Router();


//#region Users Resources Routes

routes.get("/", () => console.log("Controller"))

//#endregion


module.exports = routes;


