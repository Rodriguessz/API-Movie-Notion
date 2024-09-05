const { Router } = require("express")
const routes = Router();

const MovieController = require("../../controllers/Movie_notes")
const movieController = new MovieController();


 //#region Movies Notion Resources Routes
routes.get("/index/", movieController.index)
routes.get("/show/:note_id", movieController.show)
routes.post("/create/:user_id", movieController.create)
routes.put("/update/:note_id", movieController.update)
routes.delete("/delete/:note_id", movieController.delete)

//#endregion


module.exports = routes;