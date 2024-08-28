import express from "express"
import { createCollection, deleteCollection, getACollection, getCollection, updateCollection } from "../controllers/collection.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
const router = express.Router()


router.post("/", isLoggedIn, createCollection)
router.put("/:id", isLoggedIn, updateCollection)
router.delete("/:id", isLoggedIn, deleteCollection)
router.get("/", isLoggedIn, getCollection)
router.get("/:id", isLoggedIn, getACollection)



export default router