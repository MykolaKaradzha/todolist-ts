import React from "react";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";
import {Button} from "../../UniversalComponents/Button/Button";

type PropsType = {
    todolistID: string
    title: string
    addTask: (newTitle: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export const TodolistHeader: React.FC<PropsType> = ({title, addTask, todolistID, removeTodolist }) => {
    const removeTodolistHandler = () => {
        removeTodolist(todolistID)

    }
    return <>
        <h3>{title}
            <Button onClick={removeTodolistHandler}>X</Button>
        </h3>
        <AddTaskForm addTask={addTask} todolistID={todolistID}/>
    </>
}