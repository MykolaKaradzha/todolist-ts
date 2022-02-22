import React, {ChangeEvent} from "react";
import {taskType} from "../../../../App";
import {Button} from "../../../UniversalComponents/Button/Button";
import s from "./Task.module.css"
import {CheckBox} from "../../../UniversalComponents/CheckBox/CheckBox";


type PropsType = taskType & {
    removeTask: (id: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Task:React.FC<PropsType> = ({title, id, isDone, removeTask, changeStatus}) => {
    const completedTasksClass = isDone ? s.completed : ''
    const onClickRemoveTaskHandler = () => {
        removeTask(id)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        changeStatus(id, event.currentTarget.checked)
    }
    return (
        <li className={completedTasksClass}>
            <CheckBox  onChange={onChangeHandler} checked={isDone}>{title}</CheckBox>
            <Button className={s.removeTaskButton} onClick={onClickRemoveTaskHandler}>X</Button>
        </li>
        )
}