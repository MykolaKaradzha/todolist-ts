import {Task} from "./Task/Task";
import React from "react";

import {Buttons} from "./Buttons/Buttons";
import {filterType, TasksObjType, taskType} from "../../../App";

type PropsTypes = {
    todolistID: string
    tasks: Array<taskType>
    removeTask: (id:string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType

}

export const TasksList:React.FC<PropsTypes> = ({tasks, removeTask, changeStatus,
                                                   filter, changeFilter, todolistID}) => {

    const taskElements = tasks.map(task => <Task {...task} key={task.id} removeTask={removeTask}
                                                 changeStatus={changeStatus} todolistID={todolistID}/>)

    const taskElementsConditionalRendering = taskElements.length ? <ul>{taskElements}</ul> : <span>Please, add tasks or change filter =)</span>

    return <>
        {taskElementsConditionalRendering}
        <Buttons filter={filter} changeFilter={changeFilter} todolistID={todolistID}/>
    </>

}