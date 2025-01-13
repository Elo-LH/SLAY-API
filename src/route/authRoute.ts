import { signup } from '../controller/authController.js'
import { slayers } from '../controller/authController.js'

import { Router, Response, Request } from 'express'

const authRouter = Router()

authRouter.route('/signup').post(signup)
authRouter.route('/slayers').post(slayers)
export default authRouter
