import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="nav flex items-center justify-between px-[100px] h-[90px] border-b-[1px] border-gray-200 dark:border-gray-800 bg-white dark:bg-[#09090B]">
      <div className="logo">
        <h3 className="text-[25px] font-[700] sp-text">AICrafter</h3>
      </div>
      <div className="icons flex items-center gap-[15px] text-gray-900 dark:text-white">
        <div
          onClick={toggleTheme}
          className="icon cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <HiSun className="text-yellow-400" />
          ) : (
            <HiMoon className="text-gray-700" />
          )}
        </div>
        <div onClick={() => navigate("/no_page_found")} className="icon">
          <FaUser />
        </div>
        <div onClick={() => navigate("/no_page_found")} className="icon">
          <RiSettings3Fill />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
