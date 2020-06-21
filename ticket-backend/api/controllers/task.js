const mongoose = require("mongoose");
const Task = mongoose.model("Task");

const taskListByUserId = (req, res) => {
  Task.find({ userId: req.params.userId }).exec((err, task) => {
    res.status(200).json(task);
  });
};

const taskUpdateOne = (req, res) => {
  Task.findByIdAndUpdate(
    req.params.userId,
    {
      columnId: req.body.columnId,
      taskName: req.body.taskName
    },
    { new: true }
  ).exec((err, task) => {
    res.status(200).json(task);
  });
};

const taskDeleteOne = (req, res) => {
  Task.findByIdAndDelete(req.params.userId).exec((err, task) => {
    res.status(200).json(task);
  });
};

const taskCreate = (req, res) => {
  const task = new Task();

  task.taskName = req.body.taskName;
  task.userId = req.body.userId;
  task.columnId = req.body.columnId;

  task.save(err => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(task);
    }
  });
};

module.exports = {
  taskListByUserId,
  taskCreate,
  taskUpdateOne,
  taskDeleteOne
};
