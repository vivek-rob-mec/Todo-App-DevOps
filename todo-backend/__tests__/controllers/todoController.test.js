const todoController = require("../../controllers/todoController")

jest.mock("../../models/todoModel.js")

const mockSave = jest.fn();
const mockFind = jest.fn();

const Todo = require("../../models/todoModel")

Todo.find = mockFind

Todo.mockImplementation(() => ({
    save: mockSave
}))

describe ("when Todo Controller is invoked", ()=>{
    let req, res;

    beforeEach(()=>{
        req = {
            body: {},
            params: {}
        };

        res = {
            json: jest.fn(()=>res),
            status: jest.fn(()=>res)
        }
    })

    describe("For getTodo function", ()=>{
        it("it should return me all the todos, If everything goes right", async ()=>{
            const mockTodo = [{_id: 0, title: "Todo 1", completed: false},
                {_id: 2, title: "Todo 2", completed: false},
                {_id: 3, title: "Todo 3", completed: false}
            ]
            mockFind.mockResolvedValue(mockTodo)
            await todoController.getTodo(req,res);

            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTodo)
        })
        it("it should handle errors, if something goes wrong", async ()=>{
            const errorMessage = "Something went wrong please try later"
            mockFind.mockRejectedValue(new Error(errorMessage))

            await todoController.getTodo(req,res);
            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({message: errorMessage})
        })
    })

    describe("For addTodo function", ()=>{
        it("should create a new Todo", async() =>{
            const newTodo = {_id: "1", title: "New Todo"}
            req.body = {title: "New Todo"}
            mockSave.mockResolvedValue(newTodo)

            await todoController.addTodo(req,res)

            expect(mockSave).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(newTodo)
        })

        it("it should handle errors, if something goes wrong", async ()=>{
            const errorMessage = "Some thing went wrong please try later"
            mockSave.mockRejectedValue(new Error(errorMessage))

            await todoController.addTodo(req,res);
            expect(mockFind).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({message: errorMessage})
        })
    })
})