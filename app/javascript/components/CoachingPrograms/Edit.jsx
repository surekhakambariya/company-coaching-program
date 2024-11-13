import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { coachingProgramAPI } from "../../utils/apis/resources/coaching_program"; // Import the coachingProgramAPI instance

const EditCoachingProgram = () => {
    const { id } = useParams();
    const [coachingProgram, setCoachingProgram] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchCoachingProgram = async () => {
      try {
        const data = await coachingProgramAPI.find(id); // Fetch the coaching program
        setCoachingProgram(data); // Set the coaching program state
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      fetchCoachingProgram(); // Call the fetch function
      }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCoachingProgram(prevCoachingProgram => ({
            ...prevCoachingProgram,
            [name]: value
        }));
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await coachingProgramAPI.update(
                id,
                coachingProgram
            ); // Update the Coaching Program
            window.location.href = `/coaching_programs`; // Redirect to the new coaching program page
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
          <h2 className="text-2xl font-semibold leading-tight my-4">Edit CoachingProgram</h2>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Coaching Program Name*
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="coachingProgram" type="text" placeholder="Women in Leadership" name="name" value={coachingProgram.name} onChange={handleChange} required />
                {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 md:mb-0">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  Description
                </label>
                <textarea className="appearance none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="description" placeholder="CoachingProgram Description"type="text" name="description" value={coachingProgram.description} onChange={handleChange} />
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
export default EditCoachingProgram;
