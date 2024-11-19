const { Router } = require('express');
const mainRouter = Router();

const usersRouter = require("./users")
const moviesRouter = require("./movie_notes")
const tagsRouter = require("./tags")
const sessionRouter = require("./sessions")

//#region Resources Routes

mainRouter.get("/", (request, reponse) => reponse.json({message: "Server On!"}))
mainRouter.use("/users", usersRouter);
mainRouter.use("/movies", moviesRouter);
mainRouter.use("/tags", tagsRouter);
mainRouter.use("/sessions", sessionRouter);


//#endregion\d

module.exports = mainRouter;


