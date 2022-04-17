import React, {ChangeEvent, FormEvent, FormEventHandler} from "react";
import {taskType} from "../../../../App";
import s from "./Task.module.css"
import {EditableSpan} from "../../../UniversalComponents/EditableSpan";
import {Checkbox, FormControlLabel, FormGroup, IconButton} from "@mui/material";
import { Delete} from "@mui/icons-material";




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
        <div className={completedTasksClass}>
            {/*<CheckBox onChange={onChangeHandler} checked={isDone}>*/}
            {/*    <EditableSpan oldTitle={title} callBack={changeTaskTitleHandler}/>*/}
            {/*</CheckBox>*/}
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={onChangeHandler} checked={isDone}/>}
                                  label={
                    <>
                        <EditableSpan oldTitle={title} callBack={changeTaskTitleHandler}/>
                                      <IconButton onClick={onClickRemoveTaskHandler} size="small" color='error'>
                                      <Delete fontSize="small" />
                                      </IconButton>
                    </>
                }/>
            </FormGroup>


        </div>
        )
}