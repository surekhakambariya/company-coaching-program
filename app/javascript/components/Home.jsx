import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../utils/apis/resources/user";

const Home = () => {
  const [user, setUser] = useState({});
  const [companyPrograms, setCompanyPrograms] = useState([]);
  const [coachPrograms, setCoachPrograms] = useState([]);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);

  const fetchUser = async () => {
    try {
      const data = await userAPI.getCurrentUser();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    }
    catch (err) {
      console.error(err);
    }
  };

  const fetchUserCoachingPrograms = async () => {
    try {
      const data = await userAPI.getCurrentUserCoachingPrograms();
      setCompanyPrograms(data['company_programs']);
      setEnrolledPrograms(data['enroll_programs']);
    }
    catch (err) {
      console.error(err);
    }
  }

  const fetchUserCoachPrograms = async () => {
    try {
      const data = await userAPI.getCurrentUserCoachPrograms();
      setCoachPrograms(data['coaching_programs']);
    }
    catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchUserCoachingPrograms();
    fetchUserCoachPrograms();
  }, []);

  const handleJoinCompanyProgram = async (companyProgram) => {
    try {
      const data = await userAPI.joinCompanyProgram(companyProgram.id);
      window.location.href = `/`; // Redirect to the new coaching program page
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleLeaveCompanyProgram = async (companyProgram) => {
    try {
      const data = await userAPI.leaveCompanyProgram(companyProgram.id);
      window.location.href = `/`; // Redirect to the new coaching program page
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-4">Hello, {user.email}! You are logged in as a {user.roles}.</p>
      </div>
      {user && user.roles && user.roles.includes("employee") && (
        <div className="flex-1 p-4">
          <h1>Employee Dashboard</h1>
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
              </tr>
            </thead>
            <tbody>
              {companyPrograms.map((companyProgram) => (
                <tr key={companyProgram.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {companyProgram.coaching_program.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{companyProgram.coaching_program.description}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{companyProgram.coach.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {/* join company program  */}
                      <button type="button" style={{ color: 'green' }}
                        onClick={(event) => handleJoinCompanyProgram(companyProgram)}>
                        Join Program
                      </button>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>Already Enrolled program</h1>
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
              </tr>
            </thead>
            <tbody>
              {enrolledPrograms.map((companyProgram) => (
                <tr key={companyProgram.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {companyProgram.company_program.coaching_program.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{companyProgram.company_program.coaching_program.description}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{companyProgram.company_program.coach.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {/* join company program  */}
                      {companyProgram.status == 'leave' ? (
                        <button type="button" style={{ color: 'green' }}
                          onClick={(event) => handleJoinCompanyProgram(companyProgram.company_program)}>
                          Join Program
                        </button>
                      ) : (
                        <button type="button" style={{ color: 'red' }}
                          onClick={(event) => handleLeaveCompanyProgram(companyProgram)}>
                          leave program
                        </button>
                      )}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
      {user && user.roles && user.roles.includes("coach") && (
        <div className="flex-1 p-4">
          <h1>Coach Dashboard</h1>
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
                  Enroll count
                </th>
              </tr>
            </thead>
            <tbody>
              {coachPrograms.map((coachProgram) => (
                <tr key={coachProgram.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {coachProgram.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{coachProgram.description}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{coachProgram.user_count}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;