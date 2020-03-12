import Employee from '../../models/employee';

class EmployeeController {
  static async addEmployee(req, res) {
    //preventing double email on employee
    const existed_email = await Employee.findOne({email: req.body.email});
    if (existed_email)
      return res
        .status(400)
        .json({error: `${req.body.email} already exist, use another`});

    //preventing id to be doubled
    const existed_id = await Employee.findOne({idNumber: req.body.idNumber});
    if (existed_id)
      return res
        .status(400)
        .json({error: `${req.body.idNumber} already exist, try another`});

    if (req.body.idNumber.length != 16)
      return res.status(400).json({error: 'id Number must 16 character'});

    //prenting one phone number to be used on more than one employee
    const existed_number = await Employee.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (existed_number)
      return res
        .status(400)
        .json({error: `${req.body.phoneNumber} already exist, use another`});

    //checking if employee is above 18
    const year = req.body.birthDate.split('/');
    const realYear = parseInt(year[2]);
    const d = new Date();
    const today = d.getFullYear();

    if (today - realYear < 18)
      return res
        .status(400)
        .json({error: `${req.body.employeeName} is under 18`});

    //checking if phone number is rwandan
    let checkNumber = /^\+250/.test(req.body.phoneNumber);
    if (checkNumber != true)
      return res.status(400).json({
        error: 'Use valid rwandan number (starting with +250)',
      });

    //instantiating mongoose schema for db submission
    const employee = new Employee({
      employeeName: req.body.employeeName,
      idNumber: req.body.idNumber,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      birthDate: req.body.birthDate,
      position: req.body.position,
    });

    try {
      const saved_employee = await employee.save();
      res.json({
        msg: `${req.body.employeeName} has been successfully added`,
        employee: saved_employee,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  static async deleteEmployee(req, res) {
    const employee = await Employee.findOne({_id: req.params._id});
    if (!employee) return res.status(400).json({error: 'employee not exit'});

    try {
      await Employee.findOneAndRemove({
        _id: req.params._id,
      });
      res.json({
        msg: `${employee.employeeName} is successfully deleted`,
      });
    } catch (error) {
      res.json({error: 'internal error '});
    }
  }

  static async editEmployee(req, res) {
    const employee = await Employee.findOne({_id: req.params._id});
    if (!employee) return res.status(400).json({error: 'employee not exit'});
    //checking if provided age is not under 18
    const year = req.body.birthDate.split('/');
    const realYear = parseInt(year[2]);
    const d = new Date();
    const today = d.getFullYear();

    if (today - realYear < 18)
      return res
        .status(400)
        .json({error: `${employee.employeeName} is under 18`});

    //checking if phone number is rwandan
    let checkNumber = /^\+250/.test(req.body.phoneNumber);
    if (checkNumber != true)
      return res.status(400).json({
        error: 'Use valid rwandan number (starting with +250)',
      });

    try {
      const update_employee = await Employee.updateOne(
        {_id: req.params._id},
        {
          $set: {
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            birthDate: req.body.birthDate,
            position: req.body.position,
          },
        }
      );
      res.json({
        msg: `${update_employee.employeeName} have been successfully edited`,
      });
    } catch (error) {
      res.status(500).json({error: 'internal error, '});
    }
  }

  static async activateEmployee(req, res) {
    const employee = await Employee.findOne({_id: req.params._id});
    if (!employee) return res.status(400).json({error: 'employee not exit'});

    try {
      const activated_employee = await Employee.updateOne(
        {_id: req.params._id},
        {$set: {status: 'active'}}
      );
      res.json({
        msg: `${employee.employeeName} have been activeted successfully`,
      });
    } catch (error) {
      res.status(500).json({error: 'internal error,'});
    }
  }

  static async suspendEmployee(req, res) {
    const employee = await Employee.findOne({_id: req.params._id});
    if (!employee) return res.status(400).json({error: 'employee not exit'});

    if ((employee.status = 'suspended'))
      return res.status(400).json({
        error: `${employee.employeeName} was suspended on ${employee.date}`,
      });

    try {
      const activated_employee = await Employee.updateOne(
        {_id: req.params._id},
        {$set: {status: 'suspended', date: new Date()}}
      );
      res.json({
        msg: `${employee.employeeName} have been suspended successfully`,
      });
    } catch (error) {
      res.status(500).json({error: 'internal error,'});
    }
  }

  static async searchEmployee(req, res) {
    try {
      const searched_employee = await Employee.find({
        $or: [
          {employeeName: req.body.field},
          {position: req.body.field},
          {phoneNumber: req.body.field},
          {idNumber: req.body.field},
          {email: req.body.field},
        ],
      });

      if (searched_employee.length == 0)
        return res
          .status(404)
          .json({error: `${req.body.field} not found in the database`});

      res.json(searched_employee);
    } catch (error) {
      res.status(500).json({error: 'internal error,'});
    }
  }

  static async allEmployee(req, res) {
    try {
      const employees = await Employee.find()
        .select({
          date: 0,
          __v: 0,
        })
        .sort({employeeName: 1});

      if (!employees) return res.json({error: 'no employee start adding'});

      res.json(employees);
    } catch (error) {
      res.status(500).json({error: 'internal error,'});
    }
  }
}

export default EmployeeController;
