import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { userAPI } from "../../utils/apis/resources/user";

const EmployeeShow = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();

  const fetchEmployee = async () => {
    try {
      const data = await userAPI.find(params.id); // Fetch the employee
      setEmployee(data); // Set the Employees state
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("employeeShow useEffect");
    fetchEmployee(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      { employee && (
        <>
          <h1>Employee ID: {id}</h1>
          {/* Render employee details here */}
        </>
      )}
    </div>
  );
};

export default EmployeeShow;