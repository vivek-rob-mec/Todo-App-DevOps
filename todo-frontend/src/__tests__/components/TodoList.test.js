import React from "react";
import {render, fireEvent, screen, cleanup, waitFor} from "@testing-library/react"
import TodoList from "../../components/TodoList";
import AddTodo from "../../components/AddTodo";
import BACKEND_URL from "../../config/config";
    
afterEach(() => {
    cleanup();
    jest.resetAllMocks();
})

global.fetch = jest.fn();

describe("Todo List Component", () => {
    test("Fetch the todos and also render", async () => {

        const mockTodos = [
            {_id: "1", title: "Todo 1", completed: false},
            {_id: "2", title: "Todo 2", completed: false}
        ]

        fetch.mockResolvedValueOnce({
            json: async () => mockTodos
        })

        render(<TodoList/>);

        await waitFor(() => {
            expect(screen.getByText("Todo 1")).toBeInTheDocument();
            expect(screen.getByText("Todo 2")).toBeInTheDocument();
        })

        expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/get-todo`)
    })

    
    
    test("Add a new Todo", async () => {
        const newTodo = {_id: "1", title: "New Todo", completed: false};

        fetch.mockResolvedValueOnce({
            json: async () => [],
        }).mockResolvedValueOnce({
            json: async () => newTodo,
        })

        render(<TodoList/>)
        const input = screen.getByPlaceholderText("Add a new Todo");
        const button = screen.getByRole("button", {name: "Add Todo"})

        fireEvent.change(input,{target: {value: "New Todo"}});
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText("New Todo")).toBeInTheDocument();
        })

        expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/add-todo`,expect.any(Object))
        
    })


    // Todo: Write integration test for deletion of todos
        test("Delete a Todo", async () => {
        const mockTodos = [
            { _id: "1", title: "Todo 1", completed: false },
            { _id: "2", title: "Todo 2", completed: false },
        ];

        // First call: GET /get-todo
        fetch.mockResolvedValueOnce({
            json: async () => mockTodos
        });

        // Second call: DELETE /delete-todo/1
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: "Deleted successfully" })
        });


        render(<TodoList />);

        // Wait for initial todos to load
        await waitFor(() => {
            expect(screen.getByText("Todo 1")).toBeInTheDocument();
            expect(screen.getByText("Todo 2")).toBeInTheDocument();
        });

        // Click the delete button of "Todo 1"
        const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
        fireEvent.click(deleteButtons[0]); // Delete "Todo 1"

        // Wait for deletion to be handled
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(`${BACKEND_URL}/delete-todo/1`, expect.any(Object));
        });

        // Ensure "Todo 1" is removed from DOM
        await waitFor(() => {
            expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
        });
    });


})