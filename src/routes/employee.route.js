import {Router} from 'express';
import EmpployeeController from "../controllers/employee";

const router = new Router();

router.route('/').post(EmpployeeController.addEmployee);
router.route('/:name').delete(EmpployeeController.deleteEmployee);
router.route('/:name').put(EmpployeeController.editEmployee);
router.route('/:name/activate').put(EmpployeeController.activateEmployee);
router.route('/:name/suspend').put(EmpployeeController.suspendEmployee);

module.exports = router;