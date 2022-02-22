import {Task} from "./Task/Task";
import React from "react";

import {Buttons} from "./Buttons/Buttons";
import {filterType, taskType} from "../../../App";

type PropsTypes = {
    tasks: Array<taskType>
    removeTask: (id:string) => void
    changeStatus: (id: string, isDone: boolean) => void
    setFilter: (filter:filterType) => void
    filter: filterType

}

export const TasksList:React.FC<PropsTypes> = ({tasks, removeTask, changeStatus, filter, setFilter}) => {
    const taskElements = tasks.map(task => <Task {...task} key={task.id} removeTask={removeTask} changeStatus={changeStatus}/>)
    const taskElementsConditionalRendering = taskElements.length ? <ul>{taskElements}</ul> : <span>Please, add tasks or change filter =)</span>
    return <>
        {taskElementsConditionalRendering}
        <Buttons filter={filter} setFilter={setFilter}/>
    </>

}