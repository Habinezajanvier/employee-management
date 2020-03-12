import bcrypt from 'bcryptjs';
import Manager from '../../models/manager';
import jwt from 'jsonwebtoken';

class ManagerController {
  static async register(req, res) {
    //searching if manager existed
    const exist = await Manager.findOne({email: req.body.email});
    if (exist)
      return res.json({
        error: 'You already have an account as manager, login instead',
      });

    //searching for an identical id_number;
    const id_exist = await Manager.findOne({idNumber: req.body.idNumber});
    if (id_exist)
      return res.json({error: 'You are using an already used ID number'});

    if (req.body.idNumber.length != 16)
      return res.status(400).json({error: 'ID Number must 16 character'});

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
      birthDate: req.body.birthDate,
    });

    try {
      const saved_data = await manager.save();
      res.json({msg: 'You are successfully registered as manager'});
    } catch (error) {
      res.status(500).json({error: 'Internal error, try again later'});
    }
  }
  static async login(req, res) {
    //searching if the loged in manager already registered;
    const manager = await Manager.findOne({
      email: req.body.email,
    });
    if (!manager)
      return res.json({msg: 'First register as manager to continue'});

    //Matching entered password with the saved one
    const valid_password = await bcrypt.compare(
      req.body.password,
      manager.password
    );
    if (!valid_password) return res.json({msg: 'Your password is incorrect'});

    try {
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign({_id: manager._id}, secretKey, {
        algorithm: 'HS256',
      });
      res.header('authentication', token).json({token});
    } catch (error) {
      res.json({msg: 'Internal error,'});
    }
  }
  static async myProfile(req, res) {
    const account = await Manager.findOne({_id: req.user}).select({
      date: 0,
      __v: 0,
      password: 0,
      status: 0,
      birthDate: 0,
      _id: 0,
    });
    try {
      res.json(account);
    } catch (error) {
      res.status(500).json({error: 'Internal error, '});
    }
  }
}

export default ManagerController;
