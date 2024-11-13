import React, { useEffect, useState } from "react";
import { coachingProgramAPI } from "../../utils/apis/resources/coaching_program"; // Import the coachProgramAPI instance
import { useParams } from 'react-router-dom';

const CoachingShow = () => {
  const { id } = useParams();
  const [coachingProgram, setCoachingProgram] = useState();

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
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Coaching Program ID: {id}</h1>
      {/* Render coaching program details here */}
      {coachingProgram && (
        <div>
          <h2>{coachingProgram.name}</h2>
          <p>{coachingProgram.description}</p>
        </div>
      )}
    </div>
  );
};

export default CoachingShow;
