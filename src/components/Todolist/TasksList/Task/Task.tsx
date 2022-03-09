import React, {ChangeEvent} from "react";
import {taskType} from "../../../../App";
import {Button} from "../../../UniversalComponents/Button/Button";
import s from "./Task.module.css"
import {CheckBox} from "../../../UniversalComponents/CheckBox/CheckBox";


type PropsType = taskType & {
    todolistID: string
    removeTask: (id:string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
}

export const Task:React.FC<PropsType> = ({title, id, isDone,
                                             removeTask, changeStatus, todolistID}) => {
    const completedTasksClass = isDone ? s.completed : ''
    const onClickRemoveTaskHandler = () => {
        removeTask(id, todolistID)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, event.currentTarget.checked, todolistID)
    }
    return (
        <li className={completedTasksClass}>
            <CheckBox  onChange={onChangeHandler} checked={isDone}>{title}</CheckBox>
            <Button className={s.removeTaskButton} onClick={onClickRemoveTaskHandler}>X</Button>
        </li>
        )
}