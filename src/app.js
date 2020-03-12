import express from "express";
import mongoose from "mongoose";
import managerRoute from "./routes/manager.route";
import employeeRoute from "./routes/employee.route";
import cors from "cors";

require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Welcome to employee management" });
});

app.use("/company", managerRoute);
app.use("/company/employees", employeeRoute);

const port = process.env.PORT || 3000;

/**
 * connecting to mongodb database
 */

const url = process.env.DATABASE_URL;

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected to DB");
  }
);

app.listen(port, () =>
  console.log(
    `our app is running, can be accessed now on http://localhost:${port}/`
  )
);
