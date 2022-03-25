import {v1} from "uuid";
import {todolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

test('todolist should be removed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const todolists:Array<todolistType> = [
        {id: todolistID1, title: 'Bang', filter: "all"},
        {id: todolistID2, title: 'Lang', filter: "all"}
    ]

    const newTodolists = todolistReducer(todolists, removeTodolistAC(todolistID1));
    expect(newTodolists.length).toBe(1)
    expect(newTodolists[0].id).toBe(todolistID2)

})
test('todolist should be added', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const newTodolistID = v1()
    const newTitle = "HEyHO"

    const todolists:Array<todolistType> = [
        {id: todolistID1, title: 'Bang', filter: "all"},
        {id: todolistID2, title: 'Lang', filter: "all"}
    ]

    const newTodolists = todolistReducer(todolists, addTodolistAC(newTodolistID, newTitle));
    expect(newTodolists.length).toBe(3)
    expect(newTodolists[0].title).toBe(newTitle)

})
test('todolist title should be changed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const newTitle = "this in new title!"

    const todolists:Array<todolistType> = [
        {id: todolistID1, title: 'Bang', filter: "all"},
        {id: todolistID2, title: 'Lang', filter: "all"}
    ]

    const newTodolists = todolistReducer(todolists, changeTodolistTitleAC(todolistID1, newTitle));
    expect(newTodolists[0].title).toBe("this in new title!")

})
test('todolist filter should be changed', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const newFilter = "active"

    const todolists:Array<todolistType> = [
        {id: todolistID1, title: 'Bang', filter: "all"},
        {id: todolistID2, title: 'Lang', filter: "all"}
    ]

    const newTodolists = todolistReducer(todolists, changeTodolistFilterAC(todolistID1, newFilter));
    expect(newTodolists[0].filter).toBe("active")

})