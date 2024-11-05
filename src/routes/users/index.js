
const { MULTER } = require('../../config/upload');

const { Router } =  require('express')
const routes = Router();

//Upload configuration
const multer = require('multer');
const upload = multer(MULTER)

//Controllers
const UserController = require("../../controllers/User")
const usercontroller = new UserController();

const UserAvatarController = require("../../controllers/User/userAvatarController")
const userAvatarController = new UserAvatarController();

//Middlewares
const userAuthentication  = require("../../middleware/authentication/userAuthentication")


//#region Users Resources Routes

routes.post("/create", usercontroller.create);

routes.put("/update", userAuthentication, usercontroller.update);

routes.patch("/avatar", userAuthentication ,upload.single('avatar'), userAvatarController.update)


//#endregion


module.exports = routes;

