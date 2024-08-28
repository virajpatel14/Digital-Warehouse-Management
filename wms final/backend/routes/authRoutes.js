import express from "express"
import { changePassword, getAllUser, getProfile, login, logout, signUp } from "../controllers/auth.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", isLoggedIn, logout)

router.get("/profile", isLoggedIn, getProfile)
router.get("/all-users", isLoggedIn, getAllUser)

router.post("/password/changepassword", isLoggedIn, changePassword)


export default router