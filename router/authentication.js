import express from 'express'
import { getUser, login, register, verifyUser } from '../controller/authcontroller.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.post('/register', register)
router.post("/verify", verifyUser)
router.post("/login", login)
router.get("/profile", auth, getUser)
export default router