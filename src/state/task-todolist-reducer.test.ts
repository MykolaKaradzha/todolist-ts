import {TasksObjType, todolistType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {tasksReducer} from "./tasks-reducer";

let initialTodolists: todolistType[];
let initialTasks: TasksObjType;
let newID:string;
let todolistID1: string;
let todolistID2: string;

beforeEach( () => {
    todolistID1 = v1();
    todolistID2 = v1();
    newID = v1();
    initialTodolists = [];
    initialTasks = {};

})

test('todolist should be added, tasks array with corresponding id should be added', () => {

    const finalTodolists = todolistReducer(initialTodolists, addTodolistAC(newID));
    const finalTasks = tasksReducer(initialTasks, addTodolistAC(newID));

    const keys = Object.keys(finalTasks);
    const newTaskID = keys[0];
    const newTodolistID = finalTodolists[0].id;

    expect(newTodolistID).toBe(newID);
    expect(newTaskID).toBe(newID);

})

test('todolist should be removed, tasks array with corresponding id should be removed', () => {
    initialTodolists = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to do", filter: "all"}];
    initialTasks = {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Vue", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Earn some money", isDone: false},
            {id: v1(), title: "Leave Russia for good", isDone: true},
            {id: v1(), title: "Help people", isDone: false},
            {id: v1(), title: "Never give up", isDone: false},
        ]
    };

    const finalTodolist = todolistReducer(initialTodolists, removeTodolistAC(todolistID1))
    const finalTasks = tasksReducer(initialTasks, removeTodolistAC(todolistID1))

    const keys = Object.keys(finalTasks);

    expect(keys.length).toBe(1);
    expect(finalTodolist.length).toBe(1);
    expect(finalTasks[todolistID1]).toBeUndefined();

})