import React from "react";
import "./logout.css"; // 🔹 Import CSS for styling
import { IoLogOutOutline } from "react-icons/io5"; // 🔹 Logout Icon
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Clear user authentication data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // 🔹 Redirect to the registration page
    navigate("/");
  };

  return (
    <div onClick={handleLogout} className="logout-ui">
      <IoLogOutOutline />
      <span>Logout</span>
    </div>
  );
};

export default Logout;
