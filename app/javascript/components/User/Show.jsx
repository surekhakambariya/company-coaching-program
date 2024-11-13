import React, { useEffect, useState } from "react";
import { userAPI } from "../../utils/apis/resources/user"; // Import the userAPI instance
import { useParams } from 'react-router-dom';

const UserShow = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();

  const fetchEmployee = async () => {
    try {
      const data = await userAPI.find(id); // Fetch the employee
      setEmployee(data); // Set the employee state
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      {employee && (
        <div>
          <h1>Employee ID: {id}</h1>
          {/* Render employee details here */}
          <h2>{employee.name}</h2>
          <p>{employee.position}</p>
        </div>
      )}
    </div>
  );
};

export default UserShow;
