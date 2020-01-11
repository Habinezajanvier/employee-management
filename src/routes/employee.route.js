import {Router} from 'express';
import EmpployeeController from "../controllers/employee";
import { auth} from '../controllers/authentification';

const router = new Router();

router.route('/').post(auth, EmpployeeController.addEmployee);
router.route('/:name').delete(auth, EmpployeeController.deleteEmployee);
router.route('/:name').put(auth, EmpployeeController.editEmployee);
router.route('/:name/activate').put(auth, EmpployeeController.activateEmployee);
router.route('/:name/suspend').put(auth, EmpployeeController.suspendEmployee);

module.exports = router;