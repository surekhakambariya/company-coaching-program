import React from "react";

const Dashboard = ({user}) => {
  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="mt-4">Hello, {user.name}! You are logged in as a {user.role}.</p>
      </div>
    </div>
  );
};

export default Dashboard;