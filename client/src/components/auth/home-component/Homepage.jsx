import React, { useRef } from "react";
import "./NavBar.css";
import logo from "../../../assets/logo.png";
import ethex from "../../../assets/ethex.png";
import BackToLogin from "../../ui/BackToLogin";
import "./herosection.css";
import About from "./About";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const NavBar = () => {
  const text =
    "Build trust in transactions with Ethex — a blockchain-based escrow platform for secure, transparent deals.";

  const navigate = useNavigate();

  const aboutRef = useRef(null);

  const handleRegister = () => {
    navigate("/register");
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

        <div className="nav-button back_toLogin_ui">
          <div>
            <BackToLogin />
          </div>
        </div>
      </nav>

      <main className="hero-container-box">
        <div className="hero-background-box">
          <div className="hero-content">
            <div className="welcome-box">
              <h1 className="hero-title">Welcome to </h1>
              <img src={ethex} alt="logo" className="logo-text" />
            </div>

            <motion.p
              className="hero-subtitle"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ marginRight: "5px", display: "inline-block" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <div id="hero-button" className="hero-buttons">
              <button onClick={handleRegister} className="download-btn">
                Get started
              </button>
              <button onClick={scrollToAbout} className="docs-btn">
                About Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <div ref={aboutRef}>
        <About />
      </div>

      <Footer />
    </>
  );
};

export default NavBar;
