import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Header() {
  const [activeLink, setActiveLink] = useState("/incidents"); // default active link

  return (
    <header className="flex bg-white gap-6 sm:gap-12">
      <img src={Logo} alt="PagerDuty Logo" className="max-w-[225px] h-auto p-6" />
      <nav className="flex">
        <ul 
          className="flex w-[22rem] flex-wrap 
          items-center justify-start text-3 
          font-medium text-black gap-12 
          sm:w-[initial] sm:flex-nowrap 
          sm:gap-18"
        >
          <li 
            className={`flex justify-center 
            items-center h-full w-24 
            text-center 
            ${activeLink === "/incidents" ? 
            "border-t-2 border-[#008c31]" : ""}`}
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
            items-center h-full w-24 text-center 
            ${activeLink === "/team-members" ?
             "border-t-2 border-[#008c31]" : ""}`}
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
