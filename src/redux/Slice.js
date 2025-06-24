import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = action.payload;
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks))

    },
    TaskCompleted: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = task.status === "complete" ? "incomplete" : "complete";
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },
    removeTask: (state, action) => {
 const id = action.payload;
  state.tasks = state.tasks.filter((t) => t.id !== id); 
  localStorage.setItem("tasks", JSON.stringify(state.tasks)); 

    },
    editTask: () => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { addTask, TaskCompleted, removeTask, editTask } = taskSlice.actions

export default taskSlice.reducer