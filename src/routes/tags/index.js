const { Router } = require('express');
const routes = Router();

const TagsController = require("../../controllers/Tags")
const tagsController = new TagsController();


const userAuthentication = require("../../middleware/authentication/userAuthentication")
routes.use(userAuthentication)

//#region Tags Resource routes 

routes.get("/", tagsController.index);
routes.delete("/delete/:tag_id", tagsController.delete);

//#endregion


module.exports = routes;