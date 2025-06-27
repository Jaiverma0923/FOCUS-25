import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../Theme'
import { useDispatch, useSelector } from 'react-redux';
import { addtimer } from '../redux/timer';

const Timer = () => {
  const vis = useSelector(state => state.time.timer)
  const b = vis.length
  const no = useRef(b === 0 ? 0 : vis.s_no);
  const [timer, setTimer] = useState(b === 0 ? 1500 : vis.time)
  const [isVisible, setisVisible] = useState(b === 0 ? false : vis.vis);
  const [breakVisible, setbreakVisible] = useState(b === 0 ? false : vis.bvis);
  const sb = useRef(b === 0 ? 0 : vis.sb);
  const lb = useRef(b === 0 ? 0 : vis.lb);
  const [stop, setStop] = useState(b === 0 ? "stop" : vis.status)
  const { theme } = useContext(ThemeContext)
  const timestop = useRef(null);
  const dispatch = useDispatch();
  function checkAndResetDaily() {
    const lastReset = localStorage.getItem("lastReset");
    const now = Date.now();
    if (!lastReset || now - parseInt(lastReset, 10) > 24 * 60 * 60 * 1000) {
      no.current = 0;
      sb.current = 0;
      lb.current = 0;
      localStorage.setItem("lastReset", now.toString());
      dispatch(addtimer({
        s_no: 0,
        sb: 0,
        lb: 0,
        vis: false,
        bvis: false,
        status: "start",
        time: 1500,
      }));
    }
  }

  useEffect(() => {
    checkAndResetDaily();
  }, []);
  function handlebNew() {
    if (timestop.current) {
      clearInterval(timestop.current)
      timestop.current = null;
    }
    setisVisible(false);
    setbreakVisible(false);
    setTimer(1500);
    setStop("start");
  }
  function handleShortBreak(durationInSec) {
    if (timestop.current) {
      clearInterval(timestop.current);
      timestop.current = null;
    }
    sb.current += 1
    setTimer(durationInSec);
    setisVisible(true);
    setbreakVisible(true);
    handleTimer();
  }
  function handleLongBreak(durationInSec) {
    if (timestop.current) {
      clearInterval(timestop.current);
      timestop.current = null;
    }
    lb.current += 1
    setTimer(durationInSec);
    setisVisible(true);
    setbreakVisible(true);
    handleTimer();
  }
  function handleNew() {
    if (timer === 0) {
      if (timestop.current) {
        clearInterval(timestop.current);
        timestop.current = null;
      }
      no.current += 1;
      setisVisible(false);
      setTimer(1500);
      setStop("start");
    }
    else {
      const confirmEnd = window.confirm("Timer is still running. Do you want to terminate it?");
      if (confirmEnd) {
        if (timestop.current) {
          clearInterval(timestop.current);
          timestop.current = null;
        }
        setisVisible(false);
        setTimer(1500);
        setStop("start");
      }
    }
  }

  function handleTimer() {
    timestop.current = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : t))
    }, 1000);
    setStop("stop");
    setisVisible(true);
  }



  useEffect(() => {
    if (b !== 0 && vis.vis && vis.status === "stop") {
      handleTimer();
    }
  }, []);

  useEffect(() => {
    const t = {
      s_no: no.current,
      sb: sb.current,
      lb: lb.current,
      vis: isVisible,
      bvis: breakVisible,
      status: stop,
      time: timer,
    };
    dispatch(addtimer(t));
  }, [isVisible, stop, timer, breakVisible, sb, lb]);

  function pause() {
    if (stop === "stop") {
      clearInterval(timestop.current);
      timestop.current = null;
      setStop("start")
    }
    else {
      handleTimer();
    }
  }
  function minsec(t) {
    let a = Math.floor(t / 60) < 10 ? "0" + Math.floor(t / 60) : Math.floor(t / 60);
    let b = Math.floor(t % 60) < 10 ? "0" + Math.floor(t % 60) : Math.floor(t % 60);

    return `${a}:${b}`
  }
  return (

    <div className=' w-full h-[50%] '>
      {isVisible ? (breakVisible ? (<div className='h-full w-full flex justify-center flex-col items-center gap-4 p-10 pt-0'>
        <div
          className={`transition-all duration-300 ease-in-out 
    w-[80%] max-w-[400px] h-[250px] cursor-pointer 
    hover:scale-105 rounded-4xl shadow-lg 
    flex items-center justify-center 
    text-6xl md:text-7xl text-white font-extrabold tracking-wide 
    ${theme === "light-theme"
              ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
              : "bg-gradient-to-r from-gray-700 via-gray-900 to-black backdrop-blur-md bg-opacity-40 border-gray-700"}`}
        > {(timer < 10 && timer > 0) || stop === "start" ?
          <span
            key={timer}
            className="transition-all duration-200 text-red-600 ease-in-out scale-100 opacity-100 animate-pulse"
          >
            {minsec(timer)}
          </span> : minsec(timer)}

        </div>
        <button onClick={handlebNew} className={`h-[50%] w-[30%] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-white rounded-full text-3xl font-bold  bg-white/10 backdrop-blur-md border border-white/30 `}>NEW</button>
      </div>) : (
        <div className='h-full w-full flex justify-center flex-col items-center gap-4 p-10 pt-0'>
          <div
            onClick={pause}
            className={`transition-all duration-300 ease-in-out 
    w-[80%] max-w-[400px] h-[250px] cursor-pointer 
    hover:scale-105 rounded-4xl shadow-lg 
    flex items-center justify-center 
    text-6xl md:text-7xl text-white font-extrabold tracking-wide 
    ${theme === "light-theme"
                ? "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                : "bg-gradient-to-r from-gray-700 via-gray-900 to-black backdrop-blur-md bg-opacity-40 border-gray-700"}`}
          > {(timer < 10 && timer > 0) || stop === "start" ?
            <span
              key={timer}
              className="transition-all duration-200 text-red-600 ease-in-out scale-100 opacity-100 animate-pulse"
            >
              {minsec(timer)}
            </span> : minsec(timer)}

          </div>
          <div className='w-full h-[50%] flex justify-center gap-4'>
            <button onClick={pause} className={`h-full w-[30%] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-white  rounded-full text-3xl font-bold ${stop === "stop" ? "bg-red-600" : "bg-green-500"}`}>{stop === "stop" ? "STOP" : "START"}</button>
            <button onClick={handleNew} className={`h-full w-[30%] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-white rounded-full text-3xl font-bold  bg-white/10 backdrop-blur-md border border-white/30 `}>NEW</button>
          </div>

        </div>
      )) : (
        <div className='h-full w-full flex justify-evenly items-center'>
          <button onClick={handleTimer} className={`p-5 rounded-3xl text-[20px] font-bold h-[30%] w-[30%] ${theme === 'light-theme'
            ? 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            : 'bg-blue-400 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            }`}>
            TIMER
          </button>
          {no.current >= 2 ? <button onClick={() => handleShortBreak(300)} className={`p-5 rounded-3xl text-[20px] font-bold h-[30%] w-[30%] ${theme === 'light-theme'
            ? 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            : 'bg-blue-400 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            }`}>
            SHORT BREAK
          </button> : " "}
          {no.current >= 4 ? <button onClick={() => handleLongBreak(600)} className={`p-5 rounded-3xl text-[20px] font-bold h-[30%] w-[30%] ${theme === 'light-theme'
            ? 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            : 'bg-blue-400 hover:bg-blue-500 hover:scale-105 active:scale-95 text-white shadow-lg transition-all duration-300 ease-in-out'
            }`}>
            LONG BREAK
          </button> : ""}

        </div>
      )}

    </div>


  )
};

export default Timer
