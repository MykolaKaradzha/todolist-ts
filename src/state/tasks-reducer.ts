import {filterType, TasksObjType} from "../App"
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

type addTaskACType = ReturnType<typeof addTaskAC>;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
type filterTasksACType = ReturnType<typeof filterTasksAC>;
type ActionType =
    addTaskACType
    | removeTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | filterTasksACType
    | addTodolistACType
    | removeTodolistACType

export const tasksReducer = (state: TasksObjType, action: ActionType) => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state, [action.payload.todolistID]:
                    [{id: v1(), title: action.payload.newTitle, isDone: false}, ...state[action.payload.todolistID]]
            };
        case "REMOVE-TASK":
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
            return {
                ...state, [action.payload.todolistID]:
                    state[action.payload.todolistID]
                        .map(task => task.id === action.payload.taskID ? {
                            ...task,
                            isDone: action.payload.newStatus
                        } : task)
            };
        case "FILTER-TASKS":
            if (action.payload.filter === 'active') {
                return {
                    ...state,
                    [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.isDone !== true)
                }
            } else if (action.payload.filter === 'completed') {
                return {
                    ...state,
                    [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.isDone === true)
                }
            } else {
                return state
            }
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

export const addTaskAC = (todolistID: string, newTitle: string) => ({
    type: "ADD-TASK",
    payload: {
        newTitle,
        todolistID
    }
} as const)

export const removeTaskAC = (todolistID: string, taskID: string) => ({
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

export const changeTaskStatusAC = (todolistID: string, taskID: string, newStatus: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    payload: {
        todolistID,
        taskID,
        newStatus
    }
} as const)

export const filterTasksAC = (todolistID: string, filter: filterType) => ({
    type: "FILTER-TASKS",
    payload: {
        todolistID,
        filter,
    }
} as const)





