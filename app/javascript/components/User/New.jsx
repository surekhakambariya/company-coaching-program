import React, { useState } from "react";
import { userAPI } from "../../utils/apis/resources/user"; // Import the userAPI instance

const NewEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = {
        employee: {
          name: employeeName,
          position,
        }
      };
      await userAPI.create(data); // Use the userAPI instance to create a new employee
      window.location.href = `/users`; // Redirect to the employee list
    } catch (err) {
      setError(err.message); // Set error message from the response
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>New Employee</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Employee Name" required />
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" required />
        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default NewEmployee;
