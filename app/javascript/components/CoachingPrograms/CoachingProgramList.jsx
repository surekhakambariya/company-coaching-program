import React, { useEffect, useState } from "react";
import { coachingProgramAPI } from "../../utils/apis/resources/coaching_program"; // Import the coachingProgramAPI instance
import { userAPI } from "../../utils/apis/resources/user"; // Import the userAPI instance
import { Link } from 'react-router-dom';

const CoachingProgramList = () => {
  const [coachingPrograms, setCoachingPrograms] = useState([]); // State to hold the list of coachingPrograms
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [users, setUsers] = useState({}); // State to hold the current user

  useEffect(() => {
    const fetchCoachingPrograms = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await coachingProgramAPI.all(); // Fetch the list of coachingPrograms
        setCoachingPrograms(data); // Set the coachingPrograms state
        const allUsers = await userAPI.all();
        setUsers(allUsers);
      } catch (err) {
        setError(err.message); // Set error message if the request fails
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchCoachingPrograms(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleAddCoachingProgram = async (newCoachingProgram) => {
    setCoachingPrograms((prev) => [...prev, newCoachingProgram]); // Add new coachingProgram to the list
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this coaching program?")) {
        const data = await coachingProgramAPI.delete(id); // Delete the coaching program
        window.location.href = `/coaching_programs`; // Redirect to the new coaching program page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const assignCoach = async (coachingProgram, coachId) => {
    console.log('coachingProgram', coachingProgram)
    try{
      const data = await coachingProgramAPI.update(
        coachingProgram.id,
        {
         ...coachingProgram,
          coach_id: coachId
        }
      );
      window.location.href = `/coaching_programs`; // Redirect to the new coaching program page
    }
    catch (err) {
      setError(err.message); // Set error message if the request fails
    }
  }

  const handleChange = (event, coachingProgram) => {
    const selectedUserId = event.target.value;

    // Call assignCoach function only if a valid coach is selected
    if (selectedUserId) {
      assignCoach(coachingProgram, selectedUserId);
    }
  };


  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Coaching Programs</h2>
          <Link to="/coaching_programs/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <i className="fa-solid fa-plus"></i> <span>Program</span>
          </Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg max-h-screen overflow-auto"
          >
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Coach
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {coachingPrograms.map((coachingProgram) => (
                  <tr key={coachingProgram.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {coachingProgram.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{coachingProgram.description}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{coachingProgram?.coach?.email}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <Link to={`/coaching_programs/${coachingProgram.id}`}><i className="fa-regular fa-eye"></i></Link>
                        <> | </>
                        <Link to={`/coaching_programs/${coachingProgram.id}/edit`}><i className="fa-solid fa-pencil"></i></Link>
                        <> | </>
                        <button type="button" onClick={() => handleDelete(coachingProgram.id)} style={{ color: 'red' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <select
                        className="appearance-none w-full py-1 px-2 bg-white"
                        name="whatever"
                        id="frm-whatever"
                        onChange={(event) => handleChange(event, coachingProgram)}
                      >
                        <option value="">Assign Coach…</option>
                        {users.map((user) =>
                          user.roles.includes("coach") ? (
                            <option key={user.id} value={user.id}>
                              {user.email}
                            </option>
                          ) : null
                        )}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingProgramList;