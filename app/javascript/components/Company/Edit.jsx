import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { companyAPI } from "../../utils/apis/resources/company"; // Import the companyAPI instance

const EditCompany = () => {
    const { id } = useParams();
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchCompany = async () => {
        try {
          const data = await companyAPI.find(id); // Fetch the company
          console.log('----data----',data)
          setCompany(data); // Set the companies state
        }
        catch (err) {
          console.error(err);
        }
    };

    useEffect(() => {
        fetchCompany(); // Call the fetch function
      }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCompany(prevCompany => ({
            ...prevCompany,
            [name]: value
        }));
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await companyAPI.update(
                id,
                company
            ); // Update the company
            window.location.href = `/companies`; // Redirect to the new company page
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }

      return (
        <div className="container mx-auto p-16">
          <h2 className="text-2xl font-semibold leading-tight my-4">Edit Company</h2>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Company Name*
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="company" type="text" placeholder="ABCD" name="name" value={company.name} onChange={handleChange} required />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Website Link*
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="website" type="text" placeholder="http://...." name="website" value={company.website} onChange={handleChange} required />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 md:mb-0">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  Description
                </label>
                <textarea className="appearance none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="Company Description"type="text" name="description" value={company.description} onChange={handleChange} />
              </div>
            </div>

            <div className="w-full px-3 mb-6 md:mb-0">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full">
                  <button className="shadow-none bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-10 rounded-lg"
                    disabled={loading} >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
};
export default EditCompany;
