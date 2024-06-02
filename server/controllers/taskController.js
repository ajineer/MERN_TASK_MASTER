import Task from "../models/taskModel.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
  const { name, date } = req.body;

  try {
    const user_id = req.user._id;
    const task = await Task.create({ name, user_id, status: false, date });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  console.log("req.user: ", req.user);
  const user_id = req.user._id;
  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({ error: "No such task" });
    }

    Object.assign(task, req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "No such task" });
    }

    await task.deleteOne({ _id: id });

    console.log("Task deleted successfully");
    return res.status(200).json(task);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
