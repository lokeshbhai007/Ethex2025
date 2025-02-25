import React from "react";
import "./about.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" }); // 🔥 Removed `once: true` to trigger on every scroll

  return (
    <div className="about-container">
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} // 🔄 Reanimates on scroll
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        About Us
      </motion.h1>

      <motion.p
        className="about-description"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }} // 🔄 Reanimates on scroll
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      >
        Ethex is a revolutionary escrow platform powered by blockchain technology, ensuring secure and 
        transparent transactions like never before. Acting as a trusted intermediary, Ethex facilitates 
        seamless peer-to-peer exchanges while eliminating fraud, enhancing trust, and providing an 
        immutable record of transactions.
      </motion.p>

      <motion.p
        className="about-description"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }} // 🔄 Reanimates on scroll
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      >
        With the power of decentralized smart contracts, Ethex guarantees that funds are only released 
        when all parties meet predefined conditions. Our blockchain-based approach eliminates the need 
        for traditional intermediaries, reducing costs and increasing transaction speed. Whether you are 
        conducting business deals, purchasing digital assets, or making high-value transactions, Ethex 
        ensures that your funds remain protected until every agreement is fulfilled.
      </motion.p>

      <motion.h2
        className="features-title"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }} // 🔄 Reanimates on scroll
        transition={{ duration: 1, ease: "easeInOut", delay: 0.7 }}
      >
        Key Features
      </motion.h2>

      {/* Features Grid with Scroll Animation */}
      <div ref={ref} className="features-grid">
        {[
          { text: "Secure & Transparent: Blockchain immutability ensures tamper-proof transactions." },
          { text: "Decentralized Escrow: Smart contracts automate trust without third-party intervention." },
          { text: "Global Reach: Seamless cross-border transactions with no centralized authority." },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // 🔄 Reanimates on scroll
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} // Hover effect
          >
            <p>➢ {feature.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
