const { Router } = require('express');
const mainRouter = Router();
const usersRouter = require("./users")
const moviesRouter = require("./movies")
const tagsRouter = require("./tags")


//#region Resources Routes

mainRouter.use("/users", usersRouter)
mainRouter.use("/movies", moviesRouter)
mainRouter.use("/tags", tagsRouter)


//#endregion


module.exports = mainRouter;


