import React from "react";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {TasksList} from "./TasksList/TasksList";
import {taskType} from "../../App";




type propsType = {
    title: string
    tasks: Array<taskType>
    addTask: (newTitle: string) => void
    removeTask: (id:string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Todolist:React.FC<propsType> = ({addTask, tasks, title, removeTask, changeStatus}) => {

    return <div>
        <TodolistHeader title={title} addTask={addTask}/>
        <TasksList tasks={tasks}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
        />
    </div>
}