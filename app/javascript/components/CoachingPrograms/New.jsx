import React, { useState } from "react";
import { coachingProgramAPI } from "../../utils/apis/resources/coaching_program"; // Import the coachingProgramAPI instance

const NewCoachingProgram = () => {
  // State for form fields
  const [coachingProgramName, setCoachingProgramName] = useState("");
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
        coaching_program: {
          name: coachingProgramName,
          description
        }
      };
      const newCoachingProgram = await coachingProgramAPI.create(data); // Use the coachingProgramAPI instance to create a new coachingProgram
      window.location.href = `/coaching_programs`; // Redirect to the new coachingProgram page
    } catch (err) {
      setError(err.message); // Set error message from the response
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-16">
      <h2 className="text-2xl font-semibold leading-tight my-4">New CoachingProgram</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Coaching Program Name*
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="coachingProgram" type="text" placeholder="Women in Leadership" value={coachingProgramName} onChange={(e) => setCoachingProgramName(e.target.value)} required />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 md:mb-0">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              Description
            </label>
            <textarea className="appearance none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="CoachingProgram Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default NewCoachingProgram;
