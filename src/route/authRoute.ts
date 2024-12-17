import signup from '../controller/authController.js'

import { Router, Response, Request } from 'express'

const authRouter = Router()

authRouter.route('/signup').post(signup)
export default authRouter
