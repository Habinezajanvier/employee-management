import {Router} from "express";
import ManagerController from "../controllers/manager";

const router = new Router();

router.route('/register').post(ManagerController.register);
router.route('/login').post(ManagerController.login);

module.exports = router;