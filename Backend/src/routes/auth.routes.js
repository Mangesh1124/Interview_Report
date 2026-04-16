const { Router } = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middlewares")

const authRouter = Router();
/**
 *@route POST /api/auth/register
 *@description Register a new user
 *@access public
 */

authRouter.post("/register", authController.registerUserController);

/**
 * @route Post /api/auth/login
 * @description login user account with email and password
 * @access  public
 */

authRouter.post("/login", authController.loginUserController);

/**
 * @route Get /apii/auth/logout
 * @description logut user by putting token in blacklistModel
 * @access public
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route Get /api/auth/get-me
 * @description to get user details from token
 * @access private
 */

authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController)


module.exports = authRouter;
