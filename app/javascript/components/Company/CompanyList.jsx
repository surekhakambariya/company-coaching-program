import React, { useEffect, useState } from "react";
import { companyAPI } from "../../utils/apis/resources/company"; // Import the companyAPI instance
import NewCompany from './New'; // Import the NewCompany component
import { Link } from 'react-router-dom';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]); // State to hold the list of companies
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await companyAPI.getAllCompanies(); // Fetch the list of companies
        setCompanies(data); // Set the companies state
      } catch (err) {
        setError(err.message); // Set error message if the request fails
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchCompanies(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  const handleAddCompany = async (newCompany) => {
    setCompanies((prev) => [...prev, newCompany]); // Add new company to the list
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this company?")) {
        const data = await companyAPI.delete(id); // Delete the company
        window.location.href = `/companies`; // Redirect to the new company page
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Companies</h2>
          <Link to="/companies/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            <i className="fa-solid fa-plus"></i> <span>Company</span>
          </Link>
        </div>
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
                    User
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {company.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{company.user_id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <Link to={`/companies/${company.id}`}>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                        <> | </>
                        <Link to={`/companies/${company.id}/edit`}>
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <> | </>
                        <button type="button" onClick={() => handleDelete(company.id)} style={{ color: 'red' }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
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

export default CompanyList;