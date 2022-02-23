import React, {useState} from "react";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {TasksList} from "./TasksList/TasksList";
import {filterType, taskType} from "../../App";
import {Button} from "../UniversalComponents/Button/Button";




type propsType = {
    todolistID: string
    title: string
    tasks: Array<taskType>
    addTask: (newTitle: string) => void
    removeTask: (id:string) => void
    changeStatus: (id: string, isDone: boolean) => void
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType

}

export const Todolist:React.FC<propsType> = (
    {addTask, tasks, title,
        removeTask, changeStatus, filter, changeFilter, todolistID}) => {

    // for collapsable tasks
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const collapsedHandler = () => {
        setCollapsed(!collapsed)
    }
    return <div>
        <TodolistHeader title={title} addTask={addTask}/>
        <Button onClick={collapsedHandler}>Show Tasks</Button>
        {!collapsed && <TasksList todolistID={todolistID}
            tasks={tasks}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeFilter={changeFilter}
            filter={filter}

        />}
    </div>
}