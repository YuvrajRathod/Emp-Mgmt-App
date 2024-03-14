import React, { useState } from 'react'
import axios from 'axios';

// function based component 
export default function Allemployee({ employee, setAllEmployee }) {
  // to hide or show form 
  const [showForm, setShowForm] = useState(false);
  const [updatedEmp, setUpdatedEmp] = useState(
    {"fullName": "","age": null,"salary": null,"department": ""}
  );
  // read form data
  const formInput = (e) => {
    const { name, value } = e.target;
    setUpdatedEmp(prevState => ({
      ...prevState,
      [name]: value
    })
    );
    // console.log(updatedEmp);
  };
  // update employee and save in db 
  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      console.log(updatedEmp);
      const { data } = await axios.post(`/api/update/updateEmployee`, { id: employee.id, updatedEmp });
      console.log('Updated details:', data);
      if (data.error) {
        alert(data.error);
        return;
      }
      setShowForm(false);
      setAllEmployee(data);
      setUpdatedEmp({"fullName": "","age": null,"salary": null,"department": ""});
      alert(" employee updated successfully ");
    }
    catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  // show or hide 
  const showHide = () => {
    setShowForm(true);
  }
  const cancel = () => {
    setUpdatedEmp({"fullName": "","age": null,"salary": null,"department": ""});
    setShowForm(false);
  }
  // delete the employee 
  const deleteEmployee = async () => {
    try {
      console.log("send req");
      const { data } = await axios.delete(`/api/del/delete/${employee.id}`);
      if (data.error) {
        alert(data.error);
        console.log(data);
        return
      }
      setAllEmployee(data);
      alert("employee deleted successfully ");
    }
    catch (error) {
      console.log(error);
      alert("Something went worng");
    }
  }
  return (
    <div>
      <div className="employees-detail" key={employee.id}>
        <h2>{employee.fullName}</h2>
        <p>age: {employee.age}</p>
        <p>salary : {employee.salary}</p>
        <p>Department: {employee.department}</p>
        {showForm ? (
          <form onSubmit={updateEmployee}>
            <div className='form-div'>
              <label htmlFor="fullName">Full Name:</label>
              <input type="text" id="fullName" name="fullName" value={updatedEmp?.fullName} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="age">Age:</label>
              <input type="number" id="age" name="age" value={updatedEmp?.age} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="salary">Salary:</label>
              <input type="number" id="salary" name="salary" value={updatedEmp?.salary} onChange={formInput} />
            </div>
            <div className='form-div'>
              <label htmlFor="department">Department:</label>
              <input type="text" id="department" name="department" value={updatedEmp?.department} onChange={formInput} />
            </div>
            <button type="submit">Update Employee</button>
            <button type="reset" onClick={cancel}>cancel</button>
          </form>
        ) : (
          <button style={{backgroundColor:"#489fb5"}} onClick={showHide}>Update</button>
        )}
        <button style={{backgroundColor:"#CA4B58"}}   onClick={deleteEmployee}>Delete</button>
      </div>
    </div>
  )
}
