const { Router } = require('express');
const { route } = require('express/lib/router');
const routes = Router();

const TagsController = require("../../controllers/Tags")
const tagsController = new TagsController();

//#region Tags Resource routes 

routes.get("/index/:user_id", tagsController.index);
routes.post("/create/:user_id/:note_id", tagsController.create);
routes.put("/update/:tag_id", tagsController.update);
routes.delete("/delete/:tag_id", tagsController.delete);
routes.get("/show/:tag_id", tagsController.show);

//#endregion


module.exports = routes;