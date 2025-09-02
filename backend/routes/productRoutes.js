import express from "express"
import { addProduct, deleteProduct, getAllProducts,getProductById  , updateProduct , getProductoById, } from "../controllers/product.controller.js"
const router = express.Router()

import { isLoggedIn } from "../middlewares/auth.middleware.js"

router.post("/", isLoggedIn, addProduct)
router.get("/:id", getProductById )
router.get("/", getAllProducts)
router.put("/:id", isLoggedIn, updateProduct)
// router.put("/kk/:id", isLoggedIn, updatessProduct)
router.delete("/:id", isLoggedIn, deleteProduct)
router.get("/ok/:id", getProductoById)

export default router