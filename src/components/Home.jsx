import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../Theme';
import './Home.css'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addTask, removeTask, TaskCompleted } from '../redux/Slice';
import { useSelector } from 'react-redux';
import deld from '../assets/icond.svg';
import dell from '../assets/iconl.svg';
import Timer from './Timer';
import Quote from './Quote';
const Home = () => {
  const timer = useSelector((state) => state.time.timer)
  const tasks = useSelector((state) => state.task.tasks);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const compTask = tasks.filter((t) => t.status === "complete").length;
  const incompTask = tasks.filter((t) => t.status === "incomplete").length;
  const breaks = timer.sb * 300 + timer.lb * 600;
  const sessions = timer.s_no * 1500;
  function minsec(t) {
    const hours = Math.floor(t / 3600);
    const minutes = Math.floor((t % 3600) / 60);
    const seconds = t % 60;

    const hh = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${hh}${mm}:${ss}`;
  }
  const handleChange = (id) => {
    dispatch(TaskCompleted(id));
    const s = tasks.find((t) => t.id === id).status
    if (s === "complete") {
      toast.error("task incomplete")
    }
    else {
      toast.success("task completed")
    }
  };

  async function handleClick() {
    if (task.trim() === '') {
      const btn = document.querySelector('.add');
      btn.classList.add('scale-100');
      btn.classList.remove('hover:scale-110');

      await new Promise((resolve) => setTimeout(resolve, 200));

      btn.classList.remove('scale-100');
      btn.classList.add('hover:scale-110');
      toast.error("Task is empty");
    }
    else {
      const btn = document.querySelector('.add');
      btn.classList.add('scale-100');
      btn.classList.remove('hover:scale-110');

      await new Promise((resolve) => setTimeout(resolve, 200));

      btn.classList.remove('scale-100');
      btn.classList.add('hover:scale-110');
      const newtasks = {
        task: task.trim(),
        status: "incomplete",
        id: Date.now().toString(36),
        createdAt: new Date().toISOString(),
      }
      dispatch(addTask(newtasks));
      toast.success("task added")
      setTask('')
    }

  }
  async function handleEnter() {
    if (task.trim() === '') {
      toast.error("Task is empty");
    }
    else {
      const btn = document.querySelector('.add');
      btn.classList.add('scale-110');

      await new Promise((resolve) => setTimeout(resolve, 200));

      btn.classList.remove('scale-110');

      const newtasks = {
        task: task.trim(),
        status: "incomplete",
        id: Date.now().toString(36),
        createdAt: new Date().toISOString(),
      };

      dispatch(addTask(newtasks));

      toast.success("Task added");
      setTask('');
    }
  }
  return (
    <div className='w-full flex gap-3'>
      <div className={`${theme === 'light-theme' ? "bg-gradient-to-br from-cyan-100 to-cyan-300 text-slate-800" : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"} w-full lg:w-1/2 rounded-3xl p-6 flex flex-col shadow-xl transition-all duration-300`}>
        <div className='h-full flex flex-col'>
          <h1 className='text-6xl font-bold pb-6'>🚀 Plan Your Day</h1>
          <div>
            <input onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                handleEnter();
              }
            }} className={`w-[70%]  focus:outline-none  p-4 rounded-l-3xl ${theme === 'light-theme' ? "bg-white placeholder:text-gray-600 " : "bg-gray-400 placeholder:text-white"}`}
              type="text"
              placeholder="What's on your mind?"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleClick} className={`add w-[30%] hover:scale-110 transition-transform duration-300 ease-in-out font-bold p-4 rounded-r-3xl ${theme === 'light-theme' ? "bg-green-400 text-white" : "bg-blue-500"}`}>ADD</button>
          </div>
          <div className='h-[100%] overflow-auto mt-10 pt-0 p-10 space-y-3'>
            <ul className=''>
              {tasks.length === 0 ? (
                <li className='text-gray-500 italic'>No tasks added yet</li>
              ) : (
                tasks.map((item) => (
                  <li
                    key={item.id}
                    className={`flex justify-between items-center m-3 gap-4 px-5 py-4 rounded-2xl shadow-md transition-all
                                ${theme === 'light-theme' ? 'bg-white text-gray-800' : 'bg-gray-500 text-white'}`}
                  >

                    <div className='flex items-center justify-center gap-2'>
                      <input
                        type="checkbox"
                        checked={item.status === 'complete'}
                        onChange={() => handleChange(item.id)}
                        className={`custom-checkbox appearance-none w-5 h-5 rounded-full border-2 transition-all cursor-pointer
    ${theme === 'light-theme'
                            ? 'border-blue-500 checked:bg-blue-500 checked:border-blue-500'
                            : 'border-gray-900 checked:bg-gray-900 checked:border-gray-900'}`
                        }
                      />
                      <p className={`text-lg font-semibold break-words ${item.status === "complete" ? `line-through` : ""}  ${item.status === "complete" && theme === "light-theme" ? "text-gray-400" : ""} 
  ${item.status === "complete" && theme !== "light-theme" ? "text-gray-300" : ""}`}>{item.task}</p>
                    </div>
                    <button className=" hover:scale-110 " onClick={() => { dispatch(removeTask(item.id)); toast.success("task deleted") }}><img src={theme === "light-theme" ? dell : deld} alt="delete" className='w-7 h-7 ' /></button>
                  </li>
                ))
              )}

            </ul>
          </div>
        </div>
      </div>
      <div className={`w-[50%]  rounded-3xl p-10  ${theme === 'light-theme' ? " bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-gray-900 shadow-md  transition" : "bg-gradient-to-br from-slate-700 via-gray-800 to-black  text-white shadow-md"}`}>
        <div className='h-full'>
          <Timer />
          <div className='h-[50%] w-full flex gap-5'>
            <div className={`w-[50%] h-full rounded-3xl backdrop-blur-md shadow-xl border hover:scale-110 transition-all duration-300 ease-in-out
  ${theme === 'light-theme'
                ? "bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] text-gray-800 border-gray-300/40"
                : "bg-gradient-to-br from-[#1f2937] to-[#111827] text-white border-white/20"}`}>

              <div className='py-5 px-5 h-full overflow-hidden flex flex-col items-center gap-2 blur-md hover:blur-none transition-all duration-300 ease-in-out '>
                <h1 className='font-bold text-3xl '>📈 Task Progress</h1>
                <div className="w-full max-w-md text-[16px] font-medium space-y-1 ">

                  <div className="flex justify-between text-green-400">
                    <span>✅ Completed</span>
                    <span>{compTask}</span>
                  </div>

                  <div className="flex justify-between text-red-400">
                    <span>❌ Incomplete</span>
                    <span>{incompTask}</span>
                  </div>

                  <div className={`flex justify-between ${theme === "light-theme" ? " text-black font-bold" : "text-white"}`}>
                    <span>⏱️ Timer Sessions</span>
                    <span>{timer.s_no}</span>
                  </div>

                  <div className="flex justify-between text-blue-400">
                    <span>☕ Short Breaks</span>
                    <span>{timer.sb}</span>
                  </div>

                  <div className="flex justify-between text-purple-400">
                    <span>🛌 Long Breaks</span>
                    <span>{timer.lb}</span>
                  </div>

                  <div className={`flex justify-between font-semibold mt-2 border-t pt-2 relative group 
  ${theme === "light-theme" ? "border-gray-700 text-fuchsia-600" : "border-white/10 text-yellow-300"}`}>

                    <span>⏳ Time Spent</span>
                    <span className="relative cursor-pointer">
                      {minsec(sessions)} / {minsec(breaks)}
                      <div className="absolute right-0 top-[70%] mt-1 w-max whitespace-nowrap px-3 rounded-xl shadow-lg text-sm z-10
      opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300
      bg-black/80 text-white dark:bg-white/90 dark:text-black">
                        Sessions / Breaks
                      </div>
                    </span>
                  </div>


                  
                  <div className="mt-4">
                    <div className="text-white font-medium mb-1">
                      Overall Progress:{" "}
                      {Math.floor((compTask * 100) / (compTask + incompTask || 1))}%
                    </div>
                    <div className="w-full h-3 bg-gray-400 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.floor((compTask * 100) / (compTask + incompTask || 1))}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div
              className={`w-[50%] h-full rounded-3xl backdrop-blur-md shadow-xl border hover:scale-105 transition-all duration-300 ease-in-out
    ${theme === 'light-theme'
                  ? "bg-gradient-to-br from-[#fff4b8] via-[#fde68a] to-[#facc15] text-[#3b3b3b] border-[#facc15]/40"
                  : "bg-gradient-to-br from-[#1e293b] via-[#111827] to-[#0f172a] text-gray-200 border-[#475569]/60"
                }`}
            >
              <Quote />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
