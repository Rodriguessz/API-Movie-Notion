const { Router } =  require('express')
const routes = Router();
//#region Users Resources Routes
routes.get("/", () => controller.index)

//#endregion
module.exports = routes;

