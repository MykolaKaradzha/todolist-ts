import React from "react";
import {AddItem} from "../../UniversalComponents/AddItem";
import {EditableSpan} from "../../UniversalComponents/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type PropsType = {
    todolistID: string
    title: string
    addTask: (newTitle: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, editedTitle: string) => void

}

export const TodolistHeader: React.FC<PropsType> = ({title, addTask, todolistID,
                                                        removeTodolist, changeTodolistTitle}) => {
    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }
    const addTaskHandler = (newTitle: string) => {
            addTask(newTitle, todolistID)
    }
    const changeTodolistTitleHandler = (editedTitle: string) => {
        changeTodolistTitle(todolistID, editedTitle)
    }


    return <>
        <h3><EditableSpan oldTitle={title} callBack={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} size="small">
                <Delete fontSize="small" />
            </IconButton>
        </h3>
        <AddItem callBack={addTaskHandler}/>
    </>
}