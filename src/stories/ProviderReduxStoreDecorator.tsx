
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistID1, todolistID2, todolistReducer} from "../state/todolist-reducer";
import {v1} from "uuid";

import {AppRootState} from "../state/store";
import React from "react";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
})


const initialGlobalStore = {
    todolists: [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to do", filter: "all"}
    ],
    tasks: {
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
}


export const storyBookStore = createStore(rootReducer, initialGlobalStore as AppRootState);

export const ProviderReduxStoreDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
)