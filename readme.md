# Employee-management

employee management is web application that help a manager to manage employee he/she is incharge, a manager will be able to create an account as Manager and be able to add, activate, suspend, edit and delete an employee data.

## build with

* node.js
* epress
* javascript
* mongodb

## getting started 

- clone the repository
- create an account wth mongodb atlas
- on mongodb create a database called challenge and connect with to your application
- `cd` to the repository in your local development environment
- Create `.env` file and fill it with mongodb connecting string and created secret key
- Run `npm install` and `npm run start` to start the application 

## prerequisites 

this application require basic knowledge on javascript, nodejs with express and mongodb database

## testing the routes

### using postman

- open postman
- using url of http://localhost:3000/company/register , using post method create a manager account
- data to be submitted should be
`{\n
    employeeName: employeeName,\n
    idNumber: national_SidNumber,\n
    email: valid_email,\n
    password: Password,\n
    position: position,\n
    status: status,\n
    birthDate: birthDate\n 
}`
- using url of http://localhost:3000/company/login , using post method login as manager to get jwt token
- to add an employee, on http://localhost:3000/company/employees , 
* using post request, set a header called `authentication` and use the given token as its `key-value`
* in the body these data should be filled
`{
    employeeName: employeeName,
    idNumber: national_idNumber,
    phoneNumber: rwandan_phoneNumber,
    email: valid_email,
    status: status,
    birthDate: birthDate,
    position: position
}`
- to delete an employee, on http://localhost:3000/company/employees/{employeeName} use delete method
- to edit an employee, on http://localhost:3000/company/employees/{employeeName} use put method and the field to be updated,
- to activate employee, on http://locahost:3000/company/employees/{employeeName}/activate , on the body set the status to active; `{"status": "active"}`,
- to suspend/ desactivate, on http://localhost:3000/company/employees{employeeName}/suspend, on the body set the status to desactive; `{"status": "desactive"}`,
- your can be able to search employee using *employeeName* *employee_phoneNumber* *employee_email* or *employee_position* to do so: 
* on http://localhost:3000/company/employees/search use a fied you want in the body; `{"field":"field}`

## contact

Habineza janvier - [@habineza_jan](https://twitter.com/habineza_jan) - habinezajanvier688@gmail.com