import {v1} from "uuid";
import {todolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolists:Array<todolistType>;
let todolistID1: string;
let todolistID2: string;

beforeEach(() => {
    todolistID1 = v1();
    todolistID2 = v1();
    todolists = [
        {id: todolistID1, title: 'Bang', filter: "all"},
        {id: todolistID2, title: 'Lang', filter: "all"}
    ]
})

test('todolist should be removed', () => {


    const newTodolists = todolistReducer(todolists, removeTodolistAC(todolistID1));
    expect(newTodolists.length).toBe(1)
    expect(newTodolists[0].id).toBe(todolistID2)

})
test('todolist should be added', () => {
    const newTitle = "HEyHO"
    const newTodolists = todolistReducer(todolists, addTodolistAC(newTitle));
    expect(newTodolists.length).toBe(3)
    expect(newTodolists[0].title).toBe(newTitle)

})
test('todolist title should be changed', () => {
    const newTitle = "this in new title!"

    const newTodolists = todolistReducer(todolists, changeTodolistTitleAC(todolistID1, newTitle));
    expect(newTodolists[0].title).toBe("this in new title!")

})
test('todolist filter should be changed', () => {
    const newFilter = "active"

    const newTodolists = todolistReducer(todolists, changeTodolistFilterAC(todolistID1, newFilter));
    expect(newTodolists[0].filter).toBe("active")

})