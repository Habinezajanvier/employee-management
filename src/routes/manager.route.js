import {Router} from "express";
import ManagerController from "../controllers/manager";
import { registerValidation, loginValidation } from './validator/validation';

const router = new Router();

router.route('/register').post( registerValidation, ManagerController.register);
router.route('/login').post(loginValidation ,ManagerController.login);

module.exports = router;