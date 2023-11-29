import React from "react";
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <div>
      <header>
        <nav className="flex justify-between p-6 border-b-[2px]">
          <h1 className="font-bold text-3xl">
            The<span className="text-red-400">Tech.</span>
          </h1>
          <div><Avatar className="bg-red-500 ">H</Avatar></div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
