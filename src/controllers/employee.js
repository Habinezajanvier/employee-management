import Employee from '../../models/employee';
import transporter from '../mailer/mailer';

class EmployeeController {
    static async addEmployee (req, res) {

        //we have to prevent to add one employee two times
        const existed_employee = await Employee.findOne({employeeName: req.body.employeeName});
        if (existed_employee) return res.json({msg: `employee with name is ${req.body.employeeName} already exist`});

        const employee = new Employee({
            employeeName: req.body.employeeName,
            idNumber: req.body.idNumber,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            status: req.body.status,
            birthDate: req.body.birthDate,
            position: req.body.position
        });

        const mailOption = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "notification email",
            text: 'this an email to notify about your employement',
        };
        transporter.sendMail(mailOption, async (err, info)=>{
            if (err) console.log(err);
    
            try {
                const saved_employee = await employee.save();
                res.json(saved_employee)
            } catch (error) {
                res.json({msg: "employee not saved, \n be sure you are online and try again"})
            };
        })

        
    };

    static async deleteEmployee (req, res) {
        try {
            const be_deleted = await Employee.findOneAndRemove({employeeName: req.params.name});
            res.json({msg: `employee whose name is ${req.params.name} is deleted`})
        } catch (error) {
            res.json({msg: "internal error try again please"});
        }
    };

    static async editEmployee (req, res) {
        try {
            const update_employee = await Employee.updateOne({employeeName: req.params.name},
                {$set: {phoneNumber: req.body.phoneNumber,
                     email: req.body.email, 
                     birthDate: req.body.birthDate, 
                     position: req.body.position
                    }
                });
            res.json({msg: `${req.params.name} have been successfully edited`})

        } catch (error) {
            console.log(error)
        }
    };

    static async activateEmployee (req, res){
        try {
            const activated_employee = await Employee.updateOne({employeeName: req.params.name}, {$set: {status: req.body.status}});
            res.json({msg: `${req.params.name} have been activeted successfully`})
        } catch (error) {
            console.log(error);
        }
    };

    static async suspendEmployee (req, res){
        try {
            const activated_employee = await Employee.updateOne({employeeName: req.params.name}, {$set: {status: req.body.status}});
            res.json({msg: `${req.params.name} have been desactiveted successfully`})
        } catch (error) {
            console.log(error);
        }
    }
};

export default EmployeeController;