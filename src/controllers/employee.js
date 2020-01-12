import Employee from '../../models/employee';
import transporter from '../mailer/mailer';

class EmployeeController {
    static async addEmployee (req, res) {


        //we have to prevent to add one employee two times
        const existed_employee = await Employee.findOne({employeeName: req.body.employeeName});
        if (existed_employee) return res.status(400).json({msg: `employee with name is ${req.body.employeeName} already exist`});

        //preventing double email on employee
        const existed_email = await Employee.findOne({email: req.body.email});
        if (existed_email) return res.status(400).json({msg: `${req.body.email} already exist, use another`});

        //preventing id to be doubled
        const existed_id = await Employee.findOne({idNumber: req.body.idNumber});
        if (existed_id) return res.status(400).json({msg: `${req.bdoy.idNumber} already exist, try another`});

        //prenting one phone number to be used on more than one employee
        const existed_number = await Employee.findOne({phoneNumber: req.body.phoneNumber});
        if (existed_number) return res.status(400).json({msg: `${req.body.phoneNumber} already exist, use another`});

        const year = parseInt(req.body.year);
        const month = parseInt(req.body.month);
        const date = parseInt(req.body.date);

        //checking if employee is above 18
        const d = new Date();
        const today = d.getFullYear();

        if (today - year < 18) return res.status(400).json({msg: `${req.body.employeeName} is below 18`});

        const birthDate = `${date}/ ${month}/ ${year}`;

        //checking if phone number is rwandan
        let checkNumber = /^\+250/.test(req.body.phoneNumber);
        if (checkNumber != true ) return res.status(400).json({msg: 'phone number must be a valid rwandan number (starting with +250)'});

        //validating employee status
        if( req.boy.status != 'active' || req.body.status != 'desactive') return res.status(400).json({msg: 'your status is not valid'});

        //instantiating mongoose schema for db submission
        const employee = new Employee({
            employeeName: req.body.employeeName,
            idNumber: req.body.idNumber,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            status: req.body.status,
            birthDate: birthDate,
            position: req.body.position
        });

        const mailOption = {
            from: '"COMPANY X" <habinezajan@gmail.com>',
            to: req.body.email,
            subject: "notification email",
            text: 'this an email to notify about your employement',
            html: `<h1>notification email<h1><p>Dear ${req.body.employeeName} this is to tell you that you were employed in our company`
        };
        transporter.sendMail(mailOption, async (err, info)=>{
            if (err) res.json(err);
    
            try {
                const saved_employee = await employee.save();
                res.json({msg: `${req.body.employeeName} has been successfully added`});
            } catch (error) {
                res.json({msg: "employee not saved, \n be sure you are online and try again"})
            };
        })

        
    };

    static async deleteEmployee (req, res) {

        const employee = await Employee.findOne({employeeName: req.params.name});
        if (!employee ) return res.status(400).json({msg: 'employee not exit'});

        try {
            const be_deleted = await Employee.findOneAndRemove({employeeName: req.params.name});
            res.json({msg: `employee whose name is ${req.params.name} is deleted`})
        } catch (error) {
            res.json({msg: "internal error try again please"});
        }
    };

    static async editEmployee (req, res) {

        const year = parseInt(req.body.year);
        const month = parseInt(req.body.month);
        const date = parseInt(req.body.date);

        //checking if employee is above 18
        const d = new Date();
        const today = d.getFullYear();

        if (today - year < 18) return res.status(400).json({msg: `${req.body.employeeName} is below 18`});

        const birthDate = `${date}/ ${month}/ ${year}`;

        //checking if phone number is rwandan
        let checkNumber = /^\+250/.test(req.body.phoneNumber);
        if (checkNumber != true ) return res.status(400).json({msg: 'phone number must be a valid rwandan number (starting with +250)'});

        const employee = await Employee.findOne({employeeName: req.params.name});
        if (!employee ) return res.status(400).json({msg: 'employee not exit'});

        try {
            const update_employee = await Employee.updateOne({employeeName: req.params.name},
                {$set: {phoneNumber: req.body.phoneNumber,
                     email: req.body.email, 
                     birthDate: birthDate, 
                     position: req.body.position
                    }
                });
            res.json({msg: `${req.params.name} have been successfully edited`})

        } catch (error) {
            res.status(500).json({msg: "internal error, please try again later"});
        }
    };

    static async activateEmployee (req, res){
        //validating employee status
        if( req.boy.status != 'active' || req.body.status != 'desactive') return res.status(400).json({msg: 'your status is not valid'});

        const employee = await Employee.findOne({employeeName: req.params.name});
        if (!employee ) return res.status(400).json({msg: 'employee not exit'});

        if (employee.status == 'active') return res.json({msg: `${employee.employeeName} no need to ativate an active employee`});

        try {
            const activated_employee = await Employee.updateOne({employeeName: req.params.name}, {$set: {status: req.body.status}});
            res.json({msg: `${req.params.name} have been activeted successfully`})
        } catch (error) {
            res.status(500).json({msg: 'internal error, please try again later'});
        }
    };

    static async suspendEmployee (req, res){
        //validating employee status
        if( req.boy.status != 'active' || req.body.status != 'desactive') return res.status(400).json({msg: 'your status is not valid'});

        const employee = await Employee.findOne({employeeName: req.params.name});
        if (!employee ) return res.status(400).json({msg: 'employee not exit'});

        if (employee.status == 'desactive') return res.json({msg: `${employee.employeeName} no need to desativate an desactive employee`});
        
        try {
            const activated_employee = await Employee.updateOne({employeeName: req.params.name}, {$set: {status: req.body.status}});
            res.json({msg: `${req.params.name} have been desactiveted successfully`})
        } catch (error) {
            res.status(500).json({msg: 'internal error, please try again later'});
        }
    }

    static async searchEmployee (req, res) {
        try {
            const searched_employee = await Employee.find({
                $or:[{employeeName: req.body.employeeName}, 
                    {position: req.body.position},
                    {phoneNumber: req.body.phoneNumber},
                    {email: req.body.email}
                ]});
            
            res.json(searched_employee);
        } catch (error) {
            res.status(500).json({msg: 'internal error, try again later please'})
        }
    }
};

export default EmployeeController;