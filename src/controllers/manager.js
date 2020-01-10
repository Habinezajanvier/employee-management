import bcrypt from 'bcryptjs';
import Manager from '../../models/manager'
import jwt from 'jsonwebtoken';
import mailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import transporter from '../mailer/mailer';
import dotenv from 'dotenv';


class ManagerController {
    static async register(req, res) {
        //searching if manager existed
        const exist = await Manager.findOne({employeeName: req.body.employeeName});
        if (exist) return res.json({msg: "you already have an account as manager, login instead"});

        //searchin for a non used id;
        const email_exist = await Manager.findOne({email: req.body.email});
        if (email_exist) return res.json({msg: "your email already used by onother manager"});

        //searching for an identical id_number;
        const id_exist = await Manager.findOne({idNumber: req.body.idNumber});
        if (id_exist) return res.json({msg: "you are using an already used id number"});

        //hashing the password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //instantiating db_data to be submitted;
        const manager = new Manager({
            employeeName: req.body.employeeName,
            idNumber: req.body.idNumber,
            email: req.body.email,
            password: hashedPassword,
            position: req.body.position,
            status: req.body.status,
            birthDate: req.body.birthDate
        });

        //sending email for confirmation
        
        const mailOption = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "registration verification",
            text: 'here is the email to verify your registration',
        };
        transporter.sendMail(mailOption, (err, info)=>{
            if (err) console.log(err);
    
            console.log(info);
        })
        

        try {
            const saved_data = await manager.save();
            res.json(saved_data);
        } catch (error) {
            res.json(console.log(error))
        }
    };
    static async login(req, res){
        //searching if the loged in manager already registered;
        const manager = await Manager.findOne({employeeName: req.body.employeeName});
        if (!manager) return res.json({msg: "first register as manager to continue"});

        //Matching entered password with the saved one
        const valid_password = await bcrypt.compare(req.body.password, manager.password);
        if (!valid_password) return res.json({msg: "your password is not correct"})

        try {
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({_id: manager._id}, secretKey, { algorithm: "HS256" });
            res.header("authentication", token).json({token});
        } catch (error) {
            res.json({msg: "internal error, please try again"})
            
        }

    }
}

export default ManagerController;


