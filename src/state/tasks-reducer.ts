import {filterType, TasksObjType} from "../App"
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

type addTaskACType = ReturnType<typeof addTaskAC>;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type ActionType =
    addTaskACType
    | removeTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | addTodolistACType
    | removeTodolistACType
let initState: TasksObjType = {}

export const tasksReducer = (state = initState, action: ActionType) : TasksObjType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state, [action.payload.todolistID]:
                    [{id: v1(), title: action.payload.newTitle, isDone: false}, ...state[action.payload.todolistID]]
            };
        case "REMOVE-TASK":
            debugger;
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID]
                        .map(task => task.id === action.payload.taskID ? {
                            ...task,
                            title: action.payload.changedTitle
                        } : task)
            };
        case "CHANGE-TASK-STATUS":
            debugger;
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID]
                        .map(task => task.id === action.payload.taskID ? {
                            ...task,
                            isDone: action.payload.newStatus
                        } : task)
            };
        case "ADD-TODOLIST":
            return {
                ...state, [action.payload.newId] : []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy
        default:
            throw new Error('No such type found!')
    }
}

export const addTaskAC = (newTitle: string, todolistID: string) => ({
    type: "ADD-TASK",
    payload: {
        newTitle,
        todolistID
    }
} as const)

export const removeTaskAC = (taskID: string, todolistID: string) => ({
    type: "REMOVE-TASK",
    payload: {
        todolistID,
        taskID
    }
} as const)

export const changeTaskTitleAC = (todolistID: string, taskID: string, changedTitle: string) => ({
    type: "CHANGE-TASK-TITLE",
    payload: {
        todolistID,
        taskID,
        changedTitle
    }
} as const)

export const changeTaskStatusAC = (taskID: string, newStatus: boolean, todolistID: string) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        todolistID,
        taskID,
        newStatus
    }
} as const)






