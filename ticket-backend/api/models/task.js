const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  columnId: {
    type: String,
    required: true
  }
});

mongoose.model("Task", taskSchema);
