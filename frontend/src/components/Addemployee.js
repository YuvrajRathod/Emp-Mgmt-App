import React, { useState } from 'react'
import axios from 'axios';
export default function Addemployee({ setAllEmployee }) {
  const [showForm, setShowForm] = useState(false);
  const [newEmp, setnewEmp] = useState(
    {
      "fullName": "", "age": null, "salary": null, "department": ""
    }
  );
  const formInput = (e) => {
    const { name, value } = e.target;
    setnewEmp(prevState => ({
      ...prevState,
      [name]: value
    })
    );
    // console.log(newEmp);
  };
  const showHide = () => {
    setShowForm(true);
  }
  // fn to add new employee 
  const addNewEmployee = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/add/addNewEmployee`, { newEmp });
      if (data.error) {
        alert(data.error);
        return;
      }
      setShowForm(false);
      setnewEmp({ fullName: '', age: null, salary: null, department: '' });
      setAllEmployee(data);
      alert("Data added Successfully");
    }
    catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }
  const cancel = () => {
    setnewEmp({ fullName: '', age: null, salary: null, department: '' });
    setShowForm(false);
  }
  return (
    <div style={{border:"2px solid black", marginTop:"10px",borderRadius:"5px",backgroundColor:"#e9e9fb"}}>
      {showForm ? (
        <form className='formcss' onSubmit={addNewEmployee}>
          <div className='form-div'>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" name="fullName" value={newEmp?.fullName} onChange={formInput} />
          </div>
          <div className='form-div'>
            <label htmlFor="age">Age:</label>
            <input type="number" name="age" value={newEmp?.age} onChange={formInput} />
          </div>
          <div className='form-div'>
            <label htmlFor="salary">Salary:</label>
            <input type="number" name="salary" value={newEmp?.salary} onChange={formInput} />
          </div>
          <div className='form-div'>
            <label htmlFor="department">Department:</label>
            <input type="text" name="department" value={newEmp?.department} onChange={formInput} />
          </div>
          <button type="submit">Add Employee</button>
          <button style={{backgroundColor:"#CA4B58"}} type="reset" onClick={cancel}>cancel</button>
        </form>
      ) : (
        <button onClick={showHide}>Add New Employee</button>
      )}
    </div>
  )
}
