import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { userAPI } from "../../utils/apis/resources/user";

const CoachShow = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState();

  const fetchCoach = async () => {
    try {
      const data = await userAPI.find(params.id); // Fetch the coach
      setCoach(data); // Set the Coaches state
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("coachShow useEffect");
    fetchCoach(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h1>Coach ID: {id}</h1>
      {/* Render coach details here */}
    </div>
  );
};

export default CoachShow;