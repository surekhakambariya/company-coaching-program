import React, { useEffect, useState } from "react";
import { userAPI } from "../../utils/apis/resources/user"; // Import the userAPI instance
import { Link } from 'react-router-dom';

const CoachList = () => {
  const [coaches, setCoaches] = useState([]); // State to hold the list of coaches
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await userAPI.all({role: 'coach'}); // Fetch the list of coaches
        setCoaches(data); // Set the coaches state
      } catch (err) {
        setError(err.message); // Set error message if the request fails
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchCoaches(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Coaches</h2>
          <Link to="/coaches/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <i className="fa-solid fa-plus"></i> <span>Coach</span>
          </Link>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full max-h-lvh shadow-md rounded-lg overflow-auto"
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => (
                  <tr key={coach.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {coach.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <Link to={`/coaches/${coach.id}`}><i className="fa-regular fa-eye"></i></Link>
                      </p>
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

export default CoachList;