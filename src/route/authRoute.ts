import {
  signup,
  slayers,
  login,
  logout,
  profile,
  modifyProfile,
  modifyPassword,
  tokenRotation,
} from '../controller/authController.js'
import { auth } from '../middleware/auth.js'

import { Router, Response, Request } from 'express'

const authRouter = Router()

authRouter.route('/signup').post(signup)
authRouter.route('/login').post(login)
authRouter.route('/logout').get(auth, logout)
authRouter.route('/slayers').get(slayers)
authRouter.route('/profile').get(auth, profile)
authRouter.route('/modifyProfile').put(auth, modifyProfile)
authRouter.route('/modifyPassword').put(auth, modifyPassword)
authRouter.route('/tokenRotation').get(tokenRotation)

export default authRouter
