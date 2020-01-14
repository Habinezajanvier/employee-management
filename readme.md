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
> use **Route** given on your console

## prerequisites 

this application require basic knowledge on javascript, nodejs with express and mongodb database

## testing the routes

### using postman

- open postman
- using url of **Route/register**, using *post* method create a manager account
- data to be submitted should be

```javascript
{
    employeeName: employeeName,
    idNumber: national_SidNumber,
    email: valid_email,
    password: Password,
    position: position,
    birthDate: birthDate
}
```
- using url of **Route/login**, using *post* method login as manager to get jwt token
- to **add** an employee, on **Route/employees** , 
  - using *post* request, set a header called `authentication` and use the given token as its `key-value`
  - in the body these data should be filled

```javascript
{
    employeeName: employeeName,
    idNumber: national_idNumber,
    phoneNumber: rwandan_phoneNumber,
    email: valid_email,
    status: status, //it should be 'active'
    date: date // number of the date of bith
    month: month // number of month employee born in
    year: year // year of birth of employee
    position: position //position of employee in company
}
```

- to **delete** an employee, on **Route/employees/{employeeName}** use *delete* method
- to **edit** an employee, on **Route/employees/{employeeName}**  use *put* method and the field to be updated,
- to **activate** employee, on **Route/employees/{employeeName}/activate**, on the body set the status to active; use *put* request 

```json
{"status": "active"},
```

- to **suspend/ inactivate**, on **Route/employees{employeeName}/suspend**, on the body set the status to inactive; use *put* request 

```json
{"status": "inactive"},
```

- your can be able to search employee using *employeeName* *employee_phoneNumber* *employee_email* or *employee_position* to do so: 
  - on **route/employees/search** use a field you want in the body; the request is *post* 

```json
{"field":"field"}
```

## contact

Habineza janvier - [@habineza_jan](https://twitter.com/habineza_jan) - habinezajanvier688@gmail.com