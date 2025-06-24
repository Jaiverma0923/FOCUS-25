import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import history from "../assets/history.svg";
import home from "../assets/home.svg";
import light from "../assets/sun.svg";
import dark from "../assets/dark.svg";

import { ThemeContext } from '../Theme';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [animatingTheme, setAnimatingTheme] = useState(false);

  const handleThemeToggle = () => {
    setAnimatingTheme(true);
    setTimeout(() => {
      toggleTheme();
    }, 150);
    setTimeout(() => {
      setAnimatingTheme(false);
    }, 200);
  };

  return (
<div className={`w-fit p-2 items-center  flex flex-col gap-2 rounded-2xl shadow-lg ${theme==='light-theme' ? "bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-100":"bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800"}`}>
  <div className={`p-2 flex justify-center rounded-full  hover:scale-110 transition ${theme==='light-theme' ? " bg-indigo-100 hover:bg-indigo-200":"bg-gray-700 hover:bg-gray-600"}`}>
    <NavLink to="/"><img src={home} alt="home" className='h-10' /></NavLink>
  </div>

  {/* <div className={`p-2 flex justify-center  rounded-full  hover:scale-110 transition ${theme==='light-theme' ? "bg-indigo-100 hover:bg-indigo-200":"bg-gray-700 hover:bg-gray-600"}`}>
    <NavLink to="/history"><img src={history} alt="history" className='h-10' /></NavLink>
  </div> */}

  <div className={`p-2  rounded-full w-14 h-14 relative overflow-hidden hover:scale-110 transition  ${theme==='light-theme' ? "bg-indigo-100 hover:bg-indigo-200":"bg-gray-700 hover:bg-gray-600"}`}>

        <button onClick={handleThemeToggle} className="w-full h-full relative">
          <div
            className={`
              absolute inset-0 flex justify-center items-center transition-all duration-500 ease-in-out
              ${theme === 'dark-theme' && !animatingTheme ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
            `}
          >
            <img src={dark} alt="moon" className="h-10" />
          </div>

          {/* Sun Icon */}
          <div
            className={`
              absolute inset-0 flex justify-center items-center transition-all duration-500 ease-in-out
              ${theme === 'light-theme' && !animatingTheme ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
          >
            <img src={light} alt="sun" className="h-10" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
