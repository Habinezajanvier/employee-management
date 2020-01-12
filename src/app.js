import  express from 'express';
import mongoose from 'mongoose';
import managerRoute from './routes/manager.route';
import employeeRoute from './routes/employee.route';

require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use('/company', managerRoute);
app.use('/company/employees', employeeRoute);


const port = process.env.PORT || 3000;

//connecting to mongodb data base;
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true  },
    () => console.log('connected to database'));

app.listen(port, ()=> console.log(`our app is running, can be accessed now on $http://localhost:${port}`));