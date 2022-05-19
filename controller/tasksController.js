const Task = require("../models/task");
const tryCatchWrapper = require("../middleware/try-catch-wrapper");
const { createCustomError } = require("../error/custom-error");

const getAllTasks = tryCatchWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

const createTask = tryCatchWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json({ task, msg: "A new task is created" });
});

const getTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

const updateTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  }); // new for getting the updated response and runValidators for apply the validator in schema
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res
    .status(200)
    .json({ msg: `Task with id ${taskID} is updated`, updatedTask: task });
});

const deleteTask = tryCatchWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res
    .status(200)
    .json({ deletedTask: task, msg: `Task with id ${taskID} is deleted` });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
