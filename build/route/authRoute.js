import signup from '../controller/authController.js';
import { Router } from 'express';
const authRouter = Router();
authRouter.route('/signup').post(signup);
export default authRouter;
