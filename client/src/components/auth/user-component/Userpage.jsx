import React, { useEffect, useState } from 'react';
import "./userpage.css";
import logo from "../../../assets/logo.png";
import ethex from "../../../assets/ethex.png";
import Logout from "../../ui/Logout";
import Footer from "../home-component/Footer";
import apis from "../../../utils/apis";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(""); // 🛠 Added state for user name

  // 🛠 Fetch user data when component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("backend upi", { //have to give the backend upii
          credentials: "include" // Ensure cookies (if used) are sent
        });
        const data = await response.json();
        setUser(data.name); // Assume API returns { username: "John" }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/user/send");
  };

  return (
    <>
      <nav id="nav-bar">
        <div className="logo">
          <a href="#">
            <img src={logo} alt="logo" className="logo-img" />
            <img src={ethex} alt="logo" className="logo-text" />
          </a>
        </div>

        {/* <div id="nav-items">
          <a href="#">Home</a>
          <a href="#">Docs</a>
          <a href="#">About</a>
          <a href="#">Blogs</a>
        </div> */}

        <div className='logout-btn'><Logout /></div>
      </nav>

      <main className="hero-container">
        <div className="hero-background">
          <div className="hero-content">
            <div className="welcome-box">
              <h1 className="hero-title">Welcome, {user || "Guest"}👋</h1> 
              {/* 🛠 Updated welcome message to include user name */}
            </div>

            <div id="hero-button" className="hero-buttons">
              <button onClick={handleLogout} className="download-btn">Send Money</button>
              <button className="docs-btn">Dashboard</button>
            </div>
          </div>
        </div>
      </main>

      <div className="hii-div">hii</div>
      <Footer />
    </>
  );
};

export default NavBar;
