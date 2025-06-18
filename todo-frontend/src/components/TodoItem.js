import React from "react"

const TodoItem = ({todo, onDelete, onComplete}) => {
    return (
        <li>
            <span>{todo.title}</span>{" "}
            <span>{String(todo.completed)}</span>{" "}
            <button onClick={() => onDelete(todo._id)}>Delete Todo</button>
        </li>
    )
}

export default TodoItem;