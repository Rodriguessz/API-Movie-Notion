const { Router } = require("express")
const routes = Router();


//#region Movies Notion Resources Routes
routes.get("/", () => console.log("controller Movies_notion"))
//#endregion


module.exports = routes;