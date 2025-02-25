import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
    <div className="border-line"></div>
    <footer className="footer">
       {/* Reference plane border line */}
      <div className="footer-content">
        
        <ul className="footer-links">
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
        <br/>
        <p>© {new Date().getFullYear()} EtheX. All rights reserved.</p>
        <br/>
      </div>
    </footer>
    </>
  );
};

export default Footer;
