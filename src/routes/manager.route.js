import {Router} from 'express';
import ManagerController from '../controllers/manager';
import {registerValidation, loginValidation} from './validator/validation';
import {auth} from '../controllers/authentification';

const router = new Router();

router.post('/register', registerValidation, ManagerController.register);
router.post('/login', loginValidation, ManagerController.login);
router.get('/me', auth, ManagerController.myProfile);

module.exports = router;
