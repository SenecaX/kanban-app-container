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
  status: {
    type: Number,
    required: true
  }
});

mongoose.model("Task", taskSchema);
