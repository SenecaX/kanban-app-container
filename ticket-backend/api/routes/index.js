const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const columnController = require("../controllers/column");

router.route("/task").post(taskController.taskCreate);

router
  .route("/task/:userId")
  .get(taskController.taskListByUserId)
  .put(taskController.taskUpdateOne)
  .delete(taskController.taskDeleteOne);

router.route("/task/updateStatus/:taskId").put(taskController.taskUpdateOne);

router.route("/column").post(columnController.columnCreate);

router.route("/column/:userId").get(columnController.columnListByUserId);

module.exports = router;
