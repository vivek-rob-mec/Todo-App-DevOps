import React from "react";
import {render, fireEvent, screen, cleanup} from "@testing-library/react"

import TodoItem from "../../components/TodoItem";
import AddTodo from "../../components/AddTodo";

afterEach(() => {
    cleanup();
    jest.resetAllMocks();
})

describe("Testing the Todo Item component", () => {


    const mockTodo = {_id: "1", title: "New Todo", completed: false}
    test("check if the todo title get rendered", () => {
        render(<TodoItem todo={mockTodo}/>)
        expect(screen.getByText("New Todo")).toBeInTheDocument();
    })

    test("Check if the status of the todo is rendered", () => {
        render(<TodoItem todo={mockTodo} />);
        expect(screen.getByText("false")).toBeInTheDocument(); // completed is false
    });

  test("Check if the onDelete method is invoked when clicked on Delete button", () => {
        const mockOnDelete = jest.fn();
        render(<TodoItem todo={mockTodo} onDelete={mockOnDelete} />);
        
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(mockTodo._id);
    });

})