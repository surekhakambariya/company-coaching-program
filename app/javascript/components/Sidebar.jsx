import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../utils/apis/resources/user";

const Sidebar = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
    } else {
      fetchUser();
    }
  }, [])

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

  const logout = () => {
    const data =  userAPI.signOut()
  }

  return (
    <main className="flex">
      <div className="relative h-screen inline-flex flex-col justify-between items-center bg-white shadow p-6">
        {user && user.roles && user.roles.includes("admin") && (
          <nav className="inline-flex flex-col space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-solid fa-table-columns"></i>
              <span>Dashboard</span>
            </Link>
            <Link to="/companies" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-solid fa-building"></i>
              <span>Companies</span>
            </Link>
            <Link to="/users" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </Link>
            <Link to="/coaching_programs" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-solid fa-chalkboard"></i>
              <span>Coaching Programs</span>
            </Link>
            <Link to="/coaches" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>Coaches</span>
            </Link>
          </nav>
        )}
        {user && user.roles && (user.roles.includes("employee") ||  user.roles.includes("coach"))&& (
          <nav className="inline-flex flex-col space-y-2">
            <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              Dashboard
            </Link>
          </nav>
        )}
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          <i className="fa-solid fa-sign-out"></i> <span>Logout</span>
        </button>
      </div>
    </main>
  );
};

export default Sidebar;