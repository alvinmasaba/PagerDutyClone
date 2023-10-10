import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex flex-col">
      <Image 
        src='../assets/logo.png' 
        alt='PagerDuty Logo'
        width={'192'}
        height={'192'}
        quality={'95'}
        priority={true}
        className='h-24 w-24 rounded-full
        object-cover border-[0.35rem]
        border-white shadow-xl'
      />
      <nav className="">
        <ul className="flex w-[22rem] flex-wrap
        items-center justify-start pt-10
        gap-y-1 text-[0.9rem] font-medium
        text-gray-500 sm:w-[initial] sm:flex-nowrap
        sm:gap-5">
          <li><Link className={"link-styles"} to="/incidents">Incidents</Link></li>
          <li><Link className={"link-styles"} to="/team-members">Team</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
