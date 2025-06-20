import React, {useState, useEffect} from "react"

import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import BACKEND_URL from "../config/config"

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/get-todo`)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Error fetching the data", error)
        }
    }

    const addTodos = async (title) => {
        try {
            const response = await fetch(`${BACKEND_URL}/add-todo`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title})
            }
            )
            const newTodo = await response.json();
            setTodos((prev) => [...prev, newTodo])
            console.log("Response received", response)
        } catch (error) {
            console.error("Error while creating the todo", error)
        }
    }

    const deleteTodos = async (id) => {
    try {
        const response = await fetch(`${BACKEND_URL}/delete-todo/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove deleted todo from state
            setTodos((prev) => prev.filter(todo => todo._id !== id));
            console.log("Todo deleted successfully");
        } else {
            console.error("Failed to delete todo");
        }
    } catch (error) {
        console.error("Error while deleting the todo", error);
    }
};

    return (
        <div>
            <h1>
                Todo List
            </h1>
            <AddTodo onAdd={addTodos} />

            <ul>
                {
                    todos.map(todo => (
                        <TodoItem key={todo._id} todo={todo} onDelete={deleteTodos} />
                        
                    ))
                }
            </ul>

        </div>

    )
}

export default TodoList