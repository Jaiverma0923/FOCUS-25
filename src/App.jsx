import { Routes } from "react-router-dom"
import './App.css'
import { createBrowserRouter } from "react-router-dom"
import Home from './components/Home';
import History from './components/History';
import { RouterProvider } from 'react-router-dom';
import Navbar from "./components/Navbar";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Theme";
import { ThemeProvider } from "./Theme";

const router=createBrowserRouter([
  {
 path: "/",
    element: (
        <div className="bg- flex h-full w-full gap-3">
          <Navbar />
          <Home />
        </div>
    ),
  },
  {
    path: "/history",
    element: (
        <div className="flex h-full w-full">
          <Navbar />
          <History />
        </div>
    ),
  }
]
);

function App() {
  const { theme} = useContext(ThemeContext);

  return (
    <div className={`${theme ==='light-theme' ? "bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]" : "bg-gradient-to-br from-gray-900 via-gray-950 to-black"} h-screen w-screen p-5` }>
      <RouterProvider router={router}></RouterProvider>
      
    </div>
  )
}

export default App
