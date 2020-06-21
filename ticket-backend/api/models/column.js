const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    unique: true,
    required: false
  },
  userId: {
    type: String,
    required: false
  },
  columnId: {
    type: Number,
    required: false
  }
});

const columnSchema = new mongoose.Schema({
  columnName: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  tasks: [taskSchema]
});

mongoose.model("Column", columnSchema);
