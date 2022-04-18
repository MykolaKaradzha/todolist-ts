import {filterType, todolistType} from "../App";
import {v1} from "uuid";

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export const todolistID1 = v1();
export const todolistID2 = v1();

let initState: todolistType[] = [
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to do", filter: "all"}
]

export const todolistReducer = (state: todolistType[] = initState, action: ActionType) :Array<todolistType>=> {
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
            return state;
    }
}

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        id
    }
} as const)


export const addTodolistAC = (newTitle: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        newId: v1(),
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

