import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { companyAPI } from "../../utils/apis/resources/company"; // Import the companyAPI instance
import { userAPI } from "../../utils/apis/resources/user"; // Import the companyAPI instance
import { coachingProgramAPI } from "../../utils/apis/resources/coaching_program"; // Import the coachingProgramAPI instance
import { companyProgramAPI } from "../../utils/apis/resources/company_program"; // Import the coachingProgramAPI instance


const CompanyShow = () => {
  const { id } = useParams();
  const [company, setCompany] = useState();
  const [employees, setEmployees] = useState([]);
  const [companyPrograms, setCompanyPrograms] = useState([]); // State to hold the list of coachingPrograms
  const [allCoachingPrograms, setAllCoachingPrograms] = useState([]); // State to hold the list of coachingPrograms

  const fetchCompany = async () => {
    try {
      const data = await companyAPI.find(id); // Fetch the company
      setCompany(data); // Set the companies state
      const employeesData = await userAPI.all({company_id: id}); // Fetch the employees of the company
      setEmployees(employeesData); // Set the employees state
      const programs = await companyProgramAPI.all({company_id: id}); // Fetch the list of coachingPrograms
      setCompanyPrograms(programs); // Set the coachingPrograms state
      fetchCoachingPrograms()
    }
    catch (err) {
      console.error(err);
    }
  };

  const fetchCoachingPrograms = async () => {
    const data = await coachingProgramAPI.all(); // Fetch the list of coachingPrograms
    setAllCoachingPrograms(data); // Set the coachingPrograms state
  }

  useEffect(() => {
    console.log("CompanyShow useEffect");
    fetchCompany(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleChange = async (event) => {
    const coachingProgramId = event.target.value;
    const selectedProgram = allCoachingPrograms.find((program) => program.id === parseInt(coachingProgramId));
    try {
      const data = {
        company_id: id,
        coaching_program_id: coachingProgramId,
        coach_id: selectedProgram.coach.id
      }
      const program = await companyProgramAPI.create(data)
      window.location.href = `/companies/${id}`; // Redirect to the new coaching program page
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h1>Company ID: {id}</h1>
      <h2>Company Name: {company?.name}</h2>
      <h1>Employee List</h1>
      <Link to={`/companies/${id}/employees/new`} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        <i className="fa-solid fa-plus"></i> <span>Employee</span>
      </Link>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          className="inline-block min-w-full shadow-md rounded-lg overflow-auto max-h-screen"
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
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {employee.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <Link to={`/employees/${employee.id}`} className="text-indigo-600 hover:text-indigo-900">
                        <i className="fa-regular fa-eye"></i>
                      </Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h1>Program List</h1>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          className="inline-block min-w-full shadow-md rounded-lg overflow-auto max-h-screen"
        >
          <select
            className="appearance-none w-full py-1 px-2 bg-white"
            name="whatever"
            id="frm-whatever"
            onChange={(event) => handleChange(event)}
          >
            <option value="">Assign Coaching Program</option>
            {allCoachingPrograms.map((coachingProgram) =>
              coachingProgram.coach ? (
                <option key={coachingProgram.id} value={coachingProgram.id}>
                  {coachingProgram.name}
                </option>
              ) : null
            )}
          </select>
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
                      <Link to={`/coaching_programs/${companyProgram.id}`}><i className="fa-regular fa-eye"></i></Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyShow;