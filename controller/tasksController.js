const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task, msg: "A new task is created" });
  } catch (err) {
    res.status(500).send({ msg: err.errors.name.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }); // new for getting the updated response and runValidators for apply the validator in schema
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res
      .status(200)
      .json({ msg: `Task with id ${taskID} is updated`, updatedTask: task });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res
      .status(200)
      .json({ deletedTask: task, msg: `Task with id ${taskID} is deleted` });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
