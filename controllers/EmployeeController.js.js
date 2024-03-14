const fs = require('fs');
let employees;
// read the data 
try {
    employees = JSON.parse(fs.readFileSync('./employee.json', 'utf8'));
} catch (error) {
    console.log('Error reading file:', error);
}
// save the data 
function saveInFile() {
    try {
        fs.writeFileSync('./employee.json', JSON.stringify(employees, null, 2), 'utf8');
    } catch (error) {
        console.log('error saving the file ',error);
    }
}
// get all the employees 
const getAllEmployee = (req, res) => {
    try {
        // console.log(employees);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "unable to fetch all employee" });
    }
};

// add new employee 
const addNewEmployee= (req, res) => {
    try {
        const newData = req.body.newEmp;
        // verify all values are entered correctly
        for (let key in newData) 
        {
            if (newData[key] === null || newData[key] === undefined || newData[key] ==='')
            {
                return res.json({ error: 'All fields are required fill correctly' });
            }
        }
        // sort all employees 
        employees.sort((a, b) => {
            return a.id - b.id;
        });
        // console.log(newData)
        const len = employees.length;
        // console.log(len);
        // get the new id 
        const newid = employees[len - 1].id + 1;
        // console.log(newid);
        // add data with new id 
        employees.push({ ...newData, id: newid });
        saveInFile();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: "unable to add employee" });
    }
}

// update the existing employee
const updateEmployee=(req, res) => {
    try {
        const employeeId = parseInt(req.body.id);
        const updatedData = req.body.updatedEmp;
        // console.log(updatedData)
        // verify all values are entered correctly
        for (let key in updatedData) {
            if (updatedData[key] === null || updatedData[key] === undefined || updatedData[key] === '') {
                return res.json({ error: 'All fields are required fill correctly' });
            }
        }
        // find the index of employee
        const employeeIndex = employees.findIndex(employee => employee.id === employeeId);

        // if employee found 
        if (employeeIndex!==-1) {
            // console.log(updatedData);
            // update that index 
            employees[employeeIndex] = { ...updatedData, id: employeeId };
            saveInFile();
            res.status(200).json(employees);
        } else {
            return res.json({ error: 'something went wrong , employee not found !! ' });
        }
    } catch (error) {
        res.status(500).json({ error: "error in updating employee" })
    }
};

// delete the employee
const deleteEmployee=(req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        // find index of employee
        const employeeIndex=employees.findIndex(employee=> employee.id === employeeId);
        // remove that employee 
        if(employeeIndex !== -1)
        {
            employees.splice(employeeIndex,1);
        }else {
            return res.json({ error: 'something went wrong, employee not found !! ' });
        }
        // save in file 
        saveInFile();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: " error in deleting employee" })
    }
};

// search specific employee by name 
const getSearchedEmp = (req, res) => {
    try {
        // convert to lower case 
        const query = req.query.name.toLowerCase();
        // console.log(query);
        // compare and find filtered records 
        const result = employees.filter(employee => employee.fullName.toLowerCase().includes(query));
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "error in serching records" })
    }
}

// filter/ sort on criteria 
const filteremployee = (req, res) => {
    try {
        const option = req.body.option;
        // console.log(option);

        // any one will run based on condition
        if (option == "nameAsc") {
            // console.log("yes it is working");
            employees.sort((a, b) => {
                return a.fullName.localeCompare(b.fullName);
            });
            res.status(200).json(employees);
        }
        else if (option == "nameDesc") {
            employees.sort((a, b) => {
                return b.fullName.localeCompare(a.fullName);
            });
            res.status(200).json(employees);
        }
        else if (option == "salaryLow") {
            employees.sort((a, b) => {
                return a.salary - b.salary;
            });
            res.status(200).json(employees);
        }
        else if (option == "salaryHigh") {
            employees.sort((a, b) => {
                return b.salary - a.salary;
            });
            res.status(200).json(employees);
        }
    } catch (error) {
        res.status(500).json({ error: "error in sorting" });
    }
};

// calculate average salary of employee 
const calcutateAvgSal = (req, res) => {
    // check if no employee is present
    if (employees.length === 0) {
        return res.json({ error: 'Number of employees are zero' });
    } else {
        let averageSalary = 0;
        for (const employee of employees) {
            averageSalary += parseInt(employee.salary);
        }
        // let averageSalary = employees.reduce((acc, employee) => acc + parseInt(employee.salary), 0);
        averageSalary = averageSalary / employees.length;
        res.json({ averageSalary: averageSalary });
    }
};

module.exports={getAllEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
    getSearchedEmp,
    filteremployee,
    calcutateAvgSal
};