import {Router} from 'express';
import EmployeeController from '../controllers/employee';
import {auth} from '../controllers/authentification';
import {employeeValidation, editValidation} from './validator/validation';

const router = new Router();

router.post('/', auth, employeeValidation, EmployeeController.addEmployee);
router.delete('/:_id', auth, EmployeeController.deleteEmployee);
router.put('/:_id', auth, editValidation, EmployeeController.editEmployee);
router.put('/:_id/activate', auth, EmployeeController.activateEmployee);
router.put('/:_id/suspend', auth, EmployeeController.suspendEmployee);
router.post('/search', auth, EmployeeController.searchEmployee);
router.get('/all', auth, EmployeeController.allEmployee);

module.exports = router;
