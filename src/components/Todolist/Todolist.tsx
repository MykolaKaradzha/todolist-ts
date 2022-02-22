import React from "react";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {TasksList} from "./TasksList/TasksList";
import {filterType, taskType} from "../../App";
import {Button} from "../UniversalComponents/Button/Button";




type propsType = {
    title: string
    tasks: Array<taskType>
    addTask: (newTitle: string) => void
    removeTask: (id:string) => void
    changeStatus: (id: string, isDone: boolean) => void
    setFilter: (filter:filterType) => void
    filter: filterType
    setCollapsed: (collapsed: boolean) => void
    collapsed: boolean
}

export const Todolist:React.FC<propsType> = (
    {addTask, tasks, title,
        removeTask, changeStatus, filter, setFilter, setCollapsed, collapsed}) => {
    const collapsedHandler = () => {
        setCollapsed(!collapsed)
    }
    return <div>
        <TodolistHeader title={title} addTask={addTask}/>
        <Button onClick={collapsedHandler}>Show Tasks</Button>
        {!collapsed && <TasksList tasks={tasks}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
                   setFilter={setFilter}
                   filter={filter}
        />}
    </div>
}