import express from "express";
import { RegisterUser } from "../controller/registerUser.js";
import { authUser } from "../controller/authController.js";
import { handleRefreshToken } from "../controller/refreshToken.js";
import { handleLogout } from "../controller/LogoutController.js";
import { getUser, EditUser } from "../controller/UserControllers.js";
import { VerifyRoles } from "../Middleware/VerifyRoles.js";
import { verifyJWT } from "../Middleware/VerifyJwt.js";
import { Roles_list } from "../config/role_list.js";
const Router = express.Router();
// ------------ GET USER----------------
Router.post("/register", RegisterUser);
Router.get("/", getUser);
Router.post("/login", authUser);
Router.get("/logout", handleLogout);


export default Router;
