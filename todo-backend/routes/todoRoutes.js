const express = require("express")
const {getTodo, addTodo} = require("../controllers/todoController")

const router = express.Router()

router.get("/get-todo", getTodo)

router.post("/add-todo", addTodo)

module.exports = router;