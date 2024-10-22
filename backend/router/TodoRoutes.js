const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/TodoController");

router.get("/task", TodoController.listTasks);

router.post("/task", TodoController.createTasks);

router.put("/task/:id", TodoController.updateTasks);

router.delete("/task/:id", TodoController.deleteTasks);

module.exports = router;

