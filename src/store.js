import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./redux/Slice.js"
import timerReducer from "./redux/timer.js"
export const store = configureStore({
  reducer: {
    task : taskReducer,
    time : timerReducer
  },
})