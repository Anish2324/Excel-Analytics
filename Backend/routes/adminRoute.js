import express from 'express'
import { CheckAuth, login, logout, signup } from '../controllers/admincontroller.js'
import { protectedAdminRoute } from '../middleware/adminmiddleware.js'


const router= express.Router()
router.post("/signup",signup)
router.post("/login",login)

router.post("/logout",logout)
router.get("/check",protectedAdminRoute,CheckAuth)
export default router;