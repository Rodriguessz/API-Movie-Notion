const { Router } =  require('express')
const routes = Router();
//#region Users Resources Routes
routes.get("/index", () => controller.index)

//#endregion
module.exports = routes;

