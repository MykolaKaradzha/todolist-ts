import React, {useState} from "react";
import {TodolistHeader} from "./TodolistHeader/TodolistHeader";
import {TasksList} from "./TasksList/TasksList";
import {filterType, TasksObjType, taskType} from "../../App";
import {MyButton} from "../UniversalComponents/Button/myButton";
import styled from "styled-components";

//styles
const TodolistWrapper = styled.div`
  margin-left: 50px;
`


type propsType = {
    todolistID: string
    title: string
    addTask: (newTitle: string, todolistID: string) => void
    tasks: Array<taskType>
    removeTask: (id:string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, editedTitle: string) => void
    changeTaskTitle: (todolistID: string, taskID:string, editedTitle: string) => void
}

export const Todolist:React.FC<propsType> = (
    {addTask, tasks, title,
        removeTask, changeStatus, filter, changeFilter,
        todolistID, removeTodolist, changeTodolistTitle, changeTaskTitle}) => {

    // for collapsable tasks
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const collapsedHandler = () => {
        setCollapsed(!collapsed)
    }

    return <TodolistWrapper>
        <TodolistHeader title={title} addTask={addTask}
                        todolistID={todolistID} removeTodolist={removeTodolist} changeTodolistTitle={changeTodolistTitle}/>
        <MyButton onClick={collapsedHandler}>Show Tasks</MyButton>
        {!collapsed && <TasksList
            todolistID={todolistID}
            tasks={tasks}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeFilter={changeFilter}
            filter={filter}
            changeTaskTitle={changeTaskTitle}
        />}
    </TodolistWrapper>
}