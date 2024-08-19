import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "taskList",
  initialState: {
    list: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload.id);
    },
    updateTasks: (state, action) => {
      state.list = state.list.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
    clearTasks: (state, action) => {
      state.list = [];
    },
  },
});

export const { addTask, removeTask, clearTasks, setTasks, updateTasks } =
  listSlice.actions;
export default listSlice.reducer;
