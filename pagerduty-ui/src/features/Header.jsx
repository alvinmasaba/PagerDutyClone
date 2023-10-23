import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import Logo from "../assets/logo.png";

function Header() {
  const [activeLink, setActiveLink] = useState("/incidents"); // default active link

  return (
    <header 
      className="flex bg-white 
      gap-6 sm:gap-12 border-b-2 border-gray-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "tween",
          duration: 0.2
        }}
      >
        <img 
          src={Logo} alt="PagerDuty Logo" 
          className="max-w-[225px] h-auto p-6"
        />
      </motion.div>

      <nav className="flex relative">
        <motion.span 
            className="bg-logoGreen rounded-full h-10 w-24 
            top-1/4 transform -translate-y-1/2 absolute
            !opacity-[0.375]"
            layoutId="activeSection"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
            initial={false}
            animate={{ x: activeLink === "/incidents" ? 0 : "150%" }}
          ></motion.span>
        <ul 
          className="flex w-[22rem] flex-wrap 
          items-center justify-start text-3 
          font-medium text-gray-500 gap-12 
          sm:w-[initial] sm:flex-nowrap 
          sm:gap-18"
        >
          <li 
            className={`flex justify-center 
            items-center h-full w-24 z-10
            text-center hover:text-[#00471c]
            ${activeLink === "/incidents" ? 
            "text-[#00471c]" : ""}`}
          >
            <Link 
              className={"link-styles"} 
              to="/incidents" 
              onClick={() => 
              setActiveLink("/incidents")}
            >
              Incidents
            </Link>
          </li>
          <li 
            className={`flex justify-center 
            items-center h-full w-24 z-10
            text-center hover:text-[#00471c]
            ${activeLink === "/team-members" ?
             "text-[#00471c]" : ""}`}
          >
            <Link 
              className={"link-styles"} 
              to="/team-members" 
              onClick={() => 
              setActiveLink("/team-members")}
            >
              Team
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
