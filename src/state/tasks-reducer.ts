import {TasksObjType} from "../App"
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistID1, todolistID2} from "./todolist-reducer";

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
let initState: TasksObjType = {
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
}

export const tasksReducer = (state:TasksObjType = initState, action: ActionType) : TasksObjType => {
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
        case "ADD-TODOLIST":
            return {
                ...state, [action.payload.newId] : []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.payload.id];
            return stateCopy
        default:
            return state;
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






