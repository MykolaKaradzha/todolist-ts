import {TasksObjType, todolistType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";
import {v1} from "uuid";
import {tasksReducer} from "./tasks-reducer";

let startTasksState: TasksObjType;
let startTodolistsState: todolistType[]
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startTasksState = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
    startTodolistsState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];
})


test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }


    expect(keys.length).toBe(3);
    expect(endTasksState[newKey]).toEqual([]);
    expect(endTodolistsState.length).toBe(3);
});


test('ids should be equals', () => {
    startTasksState = {};
    startTodolistsState = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.newId);
    expect(idFromTodolists).toBe(action.payload.newId);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistId2);

    const endTaskState = tasksReducer(startTasksState, action)


    const keys = Object.keys(endTaskState);
    expect(keys.length).toBe(1);
    expect(endTaskState[todolistId2]).not.toBeDefined();
});
