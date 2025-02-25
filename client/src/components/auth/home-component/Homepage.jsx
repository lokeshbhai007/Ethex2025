import React from "react";
import "./NavBar.css";
import logo from "../../../assets/logo.png";
import ethex from "../../../assets/ethex.png";
import BackToLogin from "../../ui/BackToLogin";
import "./herosection.css";
import About from "./About";
// import "./about.css";
import { motion, useInView } from "framer-motion";
import Footer from "./Footer";
// import { useRef } from "react";

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }, // Controls delay between words
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// const About = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" }); // Animation triggers once when 100px before visible
// };

const NavBar = () => {

  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "-100px" });

  const text =
    "Build trust in transactions with Ethex — a blockchain-based escrow platform for secure, transparent deals.";

  return (
    <>
      <nav id="nav-bar">
        <div className="logo">
          <a href="#">
            <img src={logo} alt="logo" className="logo-img" />
            <img src={ethex} alt="logo" className="logo-text" />
          </a>
        </div>

        <div id="nav-items">
          <a href="#">Home</a>
          <a href="#">Docs</a>
          <a href="#">About</a>
          <a href="#">Blogs</a>
        </div>

        <div className="nav-button back_toLogin_ui">
         <div> <BackToLogin /></div>
        </div>
      </nav>

      <main className="hero-container">
        <div className="hero-background">
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
              <button className="download-btn">Get started</button>
              <button className="docs-btn">Our Mission</button>
            </div>
          </div>
        </div>
      </main>

      <About/>
      <div className="hii-div">hii</div>
      <Footer/>
    </>
  );
};

export default NavBar;
