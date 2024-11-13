import React, { useState } from "react";
import { companyAPI } from "../../utils/apis/resources/company"; // Import the companyAPI instance

const NewCompany = ({ onAddCompany }) => {
  // State for form fields
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState(""); // Renamed from applicationLink to website
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = {
        company: {
          name: companyName,
          description,
          website,
        }
      };
      const newCompany = await companyAPI.create(data); // Use the companyAPI instance to create a new company
      window.location.href = `/companies`; // Redirect to the new company page
    } catch (err) {
      setError(err.message); // Set error message from the response
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-16">
      <h2 className="text-2xl font-semibold leading-tight my-4">New Company</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Company Name*
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="company" type="text" placeholder="ABCD" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Website Link*
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  id="website" type="text" placeholder="http://...." value={website} onChange={(e) => setWebsite(e.target.value)} required />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 md:mb-0">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Description
            </label>
            <textarea className="appearance none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="Company Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div className="w-full px-3 mb-6 md:mb-0">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full">
              <button className="shadow-none bg-blue-700 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-10 rounded-lg"
                disabled={loading} >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCompany;
