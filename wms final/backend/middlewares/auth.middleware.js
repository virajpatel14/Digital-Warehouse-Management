import User from "../models/user.schema.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"
import config from "../config/index.js"

export const isLoggedIn = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new CustomError("Not authorized to access this page", 401)
    }

    try {
        const decodedJwt = JWT.verify(token, config.JWT_SECRET)

        req.user = await User.findById(decodedJwt._id, "name email role")
        next()
    } catch (error) {
        throw new CustomError("Not authorized to access this page", 401)

    }
})