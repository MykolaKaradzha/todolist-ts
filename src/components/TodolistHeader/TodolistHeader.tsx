import React from "react";
import {AddTaskForm} from "../AddTaskForm/AddTaskForm";

type propsType = { title: string }

export const TodolistHeader = (props: propsType) => {
    return <>
        <h3>{props.title}</h3>
        <AddTaskForm/>
    </>
}