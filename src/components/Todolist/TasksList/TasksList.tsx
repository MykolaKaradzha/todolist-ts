import {Task} from "./Task/Task";
import React from "react";

import {Buttons} from "./Buttons/Buttons";
import {filterType,taskType} from "../../../App";

type PropsTypes = {
    todolistID: string
    tasks: Array<taskType>
    removeTask: (id:string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType
    changeTaskTitle: (todolistID: string, taskID:string, editedTitle: string) => void

}

export const TasksList:React.FC<PropsTypes> = ({tasks, removeTask, changeStatus,
                                                   filter, changeFilter, todolistID, changeTaskTitle}) => {

    const taskElements = tasks.map(task => <Task {...task} key={task.id} removeTask={removeTask}
                                                 changeStatus={changeStatus} todolistID={todolistID}
                                                 changeTaskTitle={changeTaskTitle}/>)

    const taskElementsConditionalRendering = taskElements.length
        ? <ul>{taskElements}</ul> :
        <div>Please, add tasks or change filter =)</div>

    return <>
        {taskElementsConditionalRendering}
        <Buttons filter={filter} changeFilter={changeFilter} todolistID={todolistID}/>
    </>

}