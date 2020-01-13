import {Router} from 'express';
import EmployeeController from "../controllers/employee";
import { auth} from '../controllers/authentification';
import { employeeValidation, editValidation} from './validator/validation';

const router = new Router();

router.route('/').post( auth, employeeValidation, EmployeeController.addEmployee);
router.route('/:name').delete(auth, EmployeeController.deleteEmployee);
router.route('/:name').put(auth, editValidation, EmployeeController.editEmployee);
router.route('/:name/activate').put(auth, EmployeeController.activateEmployee);
router.route('/:name/suspend').put(auth, EmployeeController.suspendEmployee);
router.route('/search').post( auth, EmployeeController.searchEmployee);

module.exports = router;