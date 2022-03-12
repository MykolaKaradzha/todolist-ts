import React, {ChangeEvent} from "react";
import {taskType} from "../../../../App";
import s from "./Task.module.css"
import {CheckBox} from "../../../UniversalComponents/CheckBox/CheckBox";
import {EditableSpan} from "../../../UniversalComponents/EditableSpan";
import {Button} from "@mui/material";




type PropsType = taskType & {
    todolistID: string
    removeTask: (id:string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID:string, editedTitle: string) => void}

export const Task:React.FC<PropsType> = ({title, id, isDone,
                                             removeTask, changeStatus, todolistID, changeTaskTitle}) => {
    const completedTasksClass = isDone ? s.completed : ''

    const onClickRemoveTaskHandler = () => {
        removeTask(id, todolistID)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, event.currentTarget.checked, todolistID)
    }
    const changeTaskTitleHandler = (editedTitle: string) => {
        changeTaskTitle(todolistID, id, editedTitle)
    }
    return (
        <li className={completedTasksClass}>
            <CheckBox  onChange={onChangeHandler} checked={isDone}>
                <EditableSpan oldTitle={title} callBack={changeTaskTitleHandler}/></CheckBox>
            <Button className={s.removeTaskButton} onClick={onClickRemoveTaskHandler}>X</Button>

        </li>
        )
}