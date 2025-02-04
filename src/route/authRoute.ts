import {
  signup,
  slayers,
  login,
  profile,
  modifyProfile,
  tokenRotation,
} from '../controller/authController.js'
import { auth } from '../middleware/auth.js'

import { Router, Response, Request } from 'express'

const authRouter = Router()

authRouter.route('/signup').post(signup)
authRouter.route('/login').post(login)
authRouter.route('/slayers').get(slayers)
authRouter.route('/profile').get(auth, profile)
authRouter.route('/modifyProfile').put(auth, modifyProfile)
authRouter.route('/tokenRotation').get(tokenRotation)

export default authRouter
