const express = require("express");
const {getTodo, addTodo, deleteTodo} = require("../controllers/todoController");

const router = express.Router();

router.get("/get-todo", getTodo);

router.post("/add-todo", addTodo);

router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;