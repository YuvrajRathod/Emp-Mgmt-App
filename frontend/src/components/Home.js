import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Allemployee from "./Allemployee";
import Filter from "./Filter";
import Addemployee from "./Addemployee";

// home component
export default function Home() {
  // state for search field
  const [searchTerm, setSearchTerm] = useState("");
  // emp details
  const [allEmployee, setAllEmployee] = useState(null);
  // for average salary
  const [averageSal, setAverageSal] = useState(null);
  // show or hide averageSal
  const [show, setShow] = useState(false);
  // salary calculation
  const calcuateSal = async () => {
    try {
      const { data } = await axios.get(
        "/api/avgsal/calcutateAvgSal"
      );
      setAverageSal(data.averageSalary);
      console.log(data);
      setShow(true);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  // hide or show button
  const changeButton = () => {
    setShow(!show);
  };
  // function to get search input
  const searchItem = function (e) {
    setSearchTerm(e.target.value);
    if (searchTerm.length === 1) getAllEmployee();
    console.log(searchTerm);
  };
  // call to get all employees
  const getAllEmployee = async () => {
    try {
      const { data } = await axios.get(
        "/api/getAllEmployee"
      );
      setAllEmployee(data);
      console.log(allEmployee);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  // call for serching all employees
  const searchEmployee = async () => {
    try {
      const { data } = await axios.get(
        "/api/search/getSearchedEmp",
        {
          params: {
            name: searchTerm,
          },
        }
      );
      console.log(data);
      if (data.length === 0) {
        alert("No user Found With this name try another");
        return;
      }
      setAllEmployee(data);
    } catch (error) {
      console.log(error);
      alert("something went wrong ");
    }
  };
  useEffect(() => {
    getAllEmployee();
  }, []);

  return (
    <div>
      <div className="navbar">
        <h1>Employee Managment System</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={searchItem}
          />
          <button className="search-button" onClick={searchEmployee}>
            Search
          </button>
        </div>
        <Filter setAllEmployee={setAllEmployee} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Addemployee setAllEmployee={setAllEmployee}></Addemployee>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0px 5%"}}>
          <h2><u>Employee Details</u></h2>
          {!show && (
            <button style={{ height: "10%",backgroundColor:"#219ebc"}} onClick={calcuateSal}>
              Calculate Average Salary
            </button>
          )}
          {show && (
            <div style={{display: "flex", alignItems: "center"}}>
              <h3>Average Salary is {averageSal}</h3>
              <button style={{height: "10%", textAlign: "center",backgroundColor:"#219ebc"}} onClick={changeButton}> Hide salary</button>
            </div>
          )}
        </div>
        {allEmployee ? (
          <div className="employees-grid">
            {allEmployee.map((employee) => {
              return (
                <Allemployee
                  employee={employee}
                  setAllEmployee={setAllEmployee}
                />
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
