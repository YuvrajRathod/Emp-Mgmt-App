const express = require("express");
const EmployeeController = require('../controllers/EmployeeController.js.js');
const EmployeeRoutes = express.Router();

EmployeeRoutes.get('/getAllEmployee',EmployeeController.getAllEmployee);
EmployeeRoutes.post('/addNewEmployee', EmployeeController.addNewEmployee);
EmployeeRoutes.post('/updateEmployee',EmployeeController.updateEmployee);
EmployeeRoutes.delete('/delete/:id',EmployeeController.deleteEmployee);
EmployeeRoutes.get('/getSearchedEmp',EmployeeController.getSearchedEmp);
EmployeeRoutes.post('/filteremployee',EmployeeController.filteremployee);
EmployeeRoutes.get('/calcutateAvgSal',EmployeeController.calcutateAvgSal);
module.exports = EmployeeRoutes;