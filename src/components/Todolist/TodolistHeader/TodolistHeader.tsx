import React from "react";
import {AddTaskForm} from "./AddTaskForm/AddTaskForm";

type PropsType = {
    title: string
    addTask: (newTitle: string) => void
}

export const TodolistHeader: React.FC<PropsType> = ({title, addTask}) => {
    return <>
        <h3>{title}</h3>
        <AddTaskForm addTask={addTask}/>
    </>
}