import React from "react";
import {TodolistHeader} from "../TodolistHeader/TodolistHeader";
import {TasksList} from "../TasksList/TasksList";


export type taskType = {
    id: number
    title: string
    isDone: boolean
}

type propsType = {
    title: string
    tasks: Array<taskType>

}

export const Todolist = (props: propsType) => {

    return <div>
        <TodolistHeader title={props.title}/>
        <TasksList tasks={props.tasks}

        />
    </div>
}