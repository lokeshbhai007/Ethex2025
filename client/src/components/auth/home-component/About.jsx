import React, { useRef } from "react";
import "./about.css";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Scale, Rocket } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", triggerOnce: true });

  return (
    <>
      <hr className="hr-tag" />
      <div ref={ref} className="about-container">
        {/* ✅ Heading with smooth fade-in */}
        <motion.h1
          className="about-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          About Us
        </motion.h1>

        {/* ✅ About Section with Icons */}
        <div className="about-things-write">
          {[
            {
              icon: <ShieldCheck size={40} color="white" className="icon" />,
              text: "Ethex is a revolutionary escrow platform powered by blockchain technology, ensuring secure and transparent transactions like never before. Acting as a trusted intermediary, Ethex facilitates seamless peer-to-peer exchanges while eliminating fraud, enhancing trust, and providing an immutable record of transactions.",
            },
            {
              icon: <Scale size={40} color="white" className="icon" />,
              text: "At Ethex, we believe in redefining the way transactions are conducted by removing the need for traditional third-party intermediaries. Through the implementation of smart contracts, funds are securely held in escrow and are only released when all predefined conditions and agreements between the involved parties are fully met.",
            },
            {
              icon: <Rocket size={40} color="white" className="icon" />,
              text: "Our blockchain-based approach revolutionizes the traditional financial ecosystem by enabling fast, secure, and cost-effective cross-border transactions without relying on centralized authorities. Whether you are engaging in business deals, purchasing digital assets, or handling high-value transactions, Ethex guarantees that your funds remain protected until every obligation is fulfilled.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="about-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            >
              {item.icon}
              <h5 className="about-description">{item.text}</h5>
            </motion.div>
          ))}
        </div>

        {/* ✅ Key Features Section */}
        <motion.h2
          className="features-title"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        >
          Key Features
        </motion.h2>

        {/* ✅ Features Grid with animations */}
        <div className="features-grid">
          {[
            "Secure & Transparent: Blockchain immutability ensures tamper-proof transactions.",
            "Decentralized Escrow: Smart contracts automate trust without third-party intervention.",
            "Global Reach: Seamless cross-border transactions with no centralized authority.",
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.3 }}
              whileHover={{
                scale: 1.07,
                rotate: 1,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 },
              }}
            >
              <p>➢ {feature}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
