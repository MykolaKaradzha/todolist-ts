import {filterType, todolistType} from "../App";

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export const todolistReducer = (state: Array<todolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.id);
        case "ADD-TODOLIST":
            return [{id: action.payload.newId, title: action.payload.newTitle, filter: 'all'}, ...state];
            case "CHANGE-TODOLIST-TITLE":
            return state.map(
                todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.editedTitle} : todolist)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(
                todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.newFilter} : todolist)
        default:
            throw new Error('I don`t know this type!')
    }
}

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        id
    }
} as const)


export const addTodolistAC = (newId: string, newTitle?: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        newId,
        newTitle
    }
} as const)

export const changeTodolistTitleAC = (id: string, editedTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        id,
        editedTitle
    }
} as const)

export const changeTodolistFilterAC = (id: string, newFilter: filterType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        id,
        newFilter
    }
} as const)
