import express from "express"
import { createCoupon, deactivateCoupon, deleteCoupon, getAllCoupons, getCoupon } from "../controllers/coupons.controller.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import { getProductById } from '../controllers/product.controller.js';
const router = express.Router()


router.post("/", isLoggedIn, createCoupon)
router.get("/", isLoggedIn, getAllCoupons)
router.get("/:id", isLoggedIn, getCoupon)
router.get("/deactive/:id", isLoggedIn, deactivateCoupon)
router.delete("/:id", isLoggedIn, deleteCoupon)

export default router