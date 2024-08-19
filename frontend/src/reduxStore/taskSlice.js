import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    id: "",
    name: "",
    date: "",
    status: "",
  },
  reducers: {
    setTaskName: (state, action) => {
      state.name = action.payload;
    },
    setTaskDate: (state, action) => {
      state.date = action.payload;
    },
    setTaskStatus: (state, action) => {
      state.status = action.payload;
    },
    resetTask: (state) => {
      state.name = "";
      state.date = "";
      state.status = "";
    },
  },
});

export const { setTaskName, setTaskDate, setTaskStatus, resetTask } =
  taskSlice.actions;
export default taskSlice.reducer;
