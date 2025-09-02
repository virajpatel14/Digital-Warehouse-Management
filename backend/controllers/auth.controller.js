import User from "../models/user.schema.js"
import asyncHandler from "../services/asyncHandler.js"
import CustomError from "../utils/customError.js"


export const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
    httpOnly: true
}

/**************************************************
 * @SIGNUP
 * @route http://localhost:4000/api/auth/signup
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 **************************************************/

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new CustomError("Please fill all details", 400)
    }

    //check user already exist or not
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new CustomError("User already exist", 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        token,
        user
    })
})

/**************************************************
 * @LOGIN
 * @route http://localhost:4000/api/auth/login
 * @description User signIn Controller for loging new user
 * @parameters email, password
 * @returns User Object
 **************************************************/

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError("Please fill all details", 400)
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)
    if (isPasswordMatched) {
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOption)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Invalid credentials", 400)

})
/**************************************************
 * @ADMIN_LOGIN
 * @route http://localhost:4000/api/auth/admin-login
 * @description Admin signIn Controller for loging
 * @parameters email, password
 * @returns User Object
 **************************************************/

export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new CustomError("Please fill all details", 400)
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    if (user.role !== "ADMIN") {
        throw new CustomError("Not Authorized")
    }

    const isPasswordMatched = await user.comparePassword(password)
    if (isPasswordMatched) {
        const token = user.getJwtToken()
        user.password = undefined;
        res.cookie("token", token, cookieOption)
        return res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Invalid credentials", 400)

})

/**************************************************
 * @LOGOUT
 * @route http://localhost:4000/api/auth/logout
 * @description User logout by clearing user cookies
 * @parameters
 * @returns success message
 **************************************************/

export const logout = asyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
})



/**************************************************
 * @GET_PROFILE
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/profile
 * @description Check for token and populate req.user
 * @parameters 
 * @returns User Object
 **************************************************/

export const getProfile = asyncHandler(async (req, res) => {
    const { user } = req

    if (!user) {
        throw new CustomError("User not found", 404)
    }
    res.status(200).json({
        success: true,
        user
    })
})

/**************************************************
 * @GET_All_USER
 * @REQUEST_TYPE GET
 * @route http://localhost:4000/api/auth/all-user
 * @description Check all registred user
 * @parameters 
 * @returns User Object
 **************************************************/

export const getAllUser = asyncHandler(async (req, res) => {
    const getAllUsers = await User.find().populate("wishlist")
    if (!getAllUsers) {
        throw new CustomError("Users not found", 404)
    }
    res.json(getAllUsers)
})

/**************************************************
 * @CHANGE_PASSWORD
 * @route http://localhost:4000/api/auth/password/changepassword
 * @description User will be able to changed password, need to enter old correct password
 * @parameters old password, password and confirm password
 * @returns User Object
 **************************************************/

export const changePassword = asyncHandler(async (req, res) => {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body

    const user = await User.findOne({ email }).select("+password")
    const isOldPasswordMatched = await user.comparePassword(oldPassword)
    console.log(isOldPasswordMatched);
    if (!isOldPasswordMatched) {
        throw new CustomError("Invalid credentials")
    }

    if (newPassword !== confirmNewPassword) {
        throw new CustomError("Password does not matched")
    }

    user.password = newPassword
    await user.save()

    const token = user.getJwtToken()
    user.password = undefined

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        user
    })
})
