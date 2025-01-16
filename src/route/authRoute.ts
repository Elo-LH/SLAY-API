import { signup, slayers, login } from '../controller/authController.js'

import { Router, Response, Request } from 'express'

const authRouter = Router()

authRouter.route('/signup').post(signup)
authRouter.route('/login').post(login)
authRouter.route('/slayers').post(slayers)
export default authRouter
