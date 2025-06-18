const Todo = require("../models/todoModel")

const logger = require("../utils/logger")

exports.getTodo = async (req,res) => {
    console.log("Fetching the todos from DB")
    try{
        const todos = await Todo.find();
        logger.info(`Fetched all the todos ${JSON.stringify(todos)}`);
        console.log("testing logger")
        res.status(200).json(todos)
    }catch(error){
        logger.error("Error while fetching the todos",error)
        res.status(500).json({message: "Something went wrong please try later"})
    }
};

exports.addTodo = async (req,res)=>{
    try{
        const {title} = req.body;
        logger.info("Adding a new todo!",title)
        const newTodo = new Todo({
            title: title
        })
        logger.info("Adding the new todo to DB", newTodo)
        const savedTodo = await newTodo.save()
        console.log("Added the new todo to DB", savedTodo)
        res.status(200).json(savedTodo)
    }catch (error){
        logger.error("Error while adding the todos", error)
        res.status(500).json({message: "Some thing went wrong please try later"})
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`Attempting to delete todo with id: ${id}`);
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            logger.warn(`Todo with id ${id} not found`);
            return res.status(404).json({ message: "Todo not found" });
        }

        logger.info(`Deleted todo: ${JSON.stringify(deletedTodo)}`);
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
    } catch (error) {
        logger.error("Error while deleting the todo", error);
        res.status(500).json({ message: "Something went wrong, please try later" });
    }
};