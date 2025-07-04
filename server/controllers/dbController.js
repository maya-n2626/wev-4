const Task = require('../models/Task');

async function getTasks(req, res) {
   try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

async function addTask(req, res) {
  
    try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
}

async function toggleTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.done = !task.done;
    await task.save();

    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle task' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);

    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
