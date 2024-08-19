import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import listReducer from "./listSlice";

const store = configureStore({
  reducer: {
    task: taskReducer,
    list: listReducer,
  },
});

export default store;
