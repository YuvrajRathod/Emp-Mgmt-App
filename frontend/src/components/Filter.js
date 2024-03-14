import React from 'react';
import axios from 'axios';

// component for filter/sort
export default function Filter({ setAllEmployee }) {
  const getSelectedOption = async (option) => {
    try {
      const { data } = await axios.post(`/api/filter/filteremployee`, {
        option: option,
      });
      if(data.error){
        alert(data.error);
        return ;
      }
      setAllEmployee(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // console.log(option);
  };

  return (
    <div>
      <label htmlFor="selectedOption" className='select-label'>Filter by: </label>
      <select
        id="selectedOption"
        className='options'
        onChange={(e) => getSelectedOption(e.target.value)}
      >
        <option value="">Select</option>
        <option value="nameAsc">Name Asc</option>
        <option value="nameDesc">Name Desc</option>
        <option value="salaryLow">Salary Low</option>
        <option value="salaryHigh">Salary High</option>
      </select>
    </div>
  );
}