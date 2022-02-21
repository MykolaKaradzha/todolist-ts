import React from "react";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {TasksList} from "./TasksList/TasksList";
import {taskType} from "../../App";




type propsType = {
    title: string
    tasks: Array<taskType>

}

export const Todolist:React.FC<propsType> = (props) => {

    return <div>
        <TodolistHeader title={props.title}/>
        <TasksList tasks={props.tasks}

        />
    </div>
}