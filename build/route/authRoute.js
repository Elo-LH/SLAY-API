import signup from '../controller/authController';
const router = require('express').Router();
router.route('/signup').post(signup);
export default router;
