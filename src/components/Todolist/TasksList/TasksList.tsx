import {Task} from "./Task/Task";
import React from "react";

import {Buttons} from "./Buttons/Buttons";
import {taskType} from "../../../App";

type PropsTypes = {
    tasks: Array<taskType>
    removeTask: (id:string) => void
    changeStatus: (id: string, isDone: boolean) => void

}

export const TasksList:React.FC<PropsTypes> = ({tasks, removeTask, changeStatus}) => {
    const taskElements = tasks.map(task => <Task {...task} key={task.id} removeTask={removeTask} changeStatus={changeStatus}/>)
    return <>
        <ul>
            {taskElements}
        </ul>
        <Buttons/>
    </>

}