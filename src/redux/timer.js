import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timer:localStorage.getItem("timer") ? JSON.parse(localStorage.getItem("timer")):[] 
}

export const timerSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    addtimer: (state,action) => {
      const timer=action.payload;

      state.timer=timer;
      localStorage.setItem("timer", JSON.stringify(state.timer))
    },
    
  },
})


export const { addtimer } = timerSlice.actions

export default timerSlice.reducer