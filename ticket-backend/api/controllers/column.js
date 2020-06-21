const mongoose = require("mongoose");
const Column = mongoose.model("Column");

const columnListByUserId = (req, res) => {
  Column.find({ userId: req.params.userId }).exec((err, column) => {
    res.status(200).json(column);
  });
};

const columnDeleteOne = (req, res) => {
  Column.findByIdAndDelete(req.params.userId).exec((err, column) => {
    res.status(200).json(column);
  });
};

const columnCreate = (req, res) => {
  const column = new Column();

  column.columnName = req.body.columnName;
  column.userId = req.body.userId;
  column.tasks = [];

  column.save(err => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(column);
    }
  });
};

module.exports = {
  columnListByUserId,
  columnCreate,
  columnDeleteOne
};
