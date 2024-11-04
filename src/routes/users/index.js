const { Router } =  require('express')
const routes = Router();

const UserController = require("../../controllers/User")
const usercontroller = new UserController();

const userAuthentication  = require("../../middleware/authentication/userAuthentication")


const DiskStorage = require('../../providers/DiskStorage')
const diskStorage = new DiskStorage();

const multer = require('multer');
const { MULTER } = require('../../config/upload');
const upload = multer(MULTER)
//#region Users Resources Routes

routes.post("/create", usercontroller.create);

routes.put("/update/:user_id", userAuthentication, usercontroller.update);

routes.patch("/avatar", upload.single('avatar') ,async (request, response) => {
    const avatarFile = request.file.filename;
    console.log(avatarFile)

    await diskStorage.save(avatarFile);
})


//#endregion


module.exports = routes;

