const { Router } = require("express")
const routes = Router();

const MovieController = require("../../controllers/Movie_notes")
const movieController = new MovieController();


 //#region Movies Notion Resources Routes
routes.post("/create/:user_id",movieController.create )
//#endregion


module.exports = routes;