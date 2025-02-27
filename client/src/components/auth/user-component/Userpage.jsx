import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userpage.css";
import logo from "../../../assets/logo.png";
import ethex from "../../../assets/ethex.png";
import Logout from "../../ui/Logout";
import Footer from "../home-component/Footer";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login"); // ✅ Redirect if user is not logged in
    } else {
      setUser(userData);
    }
  }, [navigate]);

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
        <div className="logout-btn">
          <Logout />
        </div>
      </nav>

      <main className="hero-container">
        <div className="hero-background">
          <div className="hero-content">
            <div className="welcome-box">
              <h1 className="hero-title">Welcome {user?.name || "Guest"}👋</h1>
            </div>

            <div id="hero-button" className="hero-buttons">
            <button onClick={handleLogout} className="download-btn">Send Money</button>

              <button className="docs-btn">Dashboard</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserPage;
