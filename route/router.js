import express from "express"
import { getCurrentUser, getOtherUser, login, logOut, signup } from "../controller/auth.js"
import { isAuth } from "../isAuth.js/isAuh.js"


const authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/logout",logOut)
authRouter.get("/getCurrent",isAuth,getCurrentUser)
authRouter.get("/getOther",isAuth,getOtherUser)


export default authRouter