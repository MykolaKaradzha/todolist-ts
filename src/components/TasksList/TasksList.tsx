import {Task} from "../Task/Task";
import React from "react";
import {taskType} from "../Todolist/Todolist";
import {Buttons} from "../Buttons/Buttons";

type propsTypes = {
    tasks: Array<taskType>

}

export const TasksList = (props: propsTypes) => {
    return <>
        <ul>
            <Task {...props.tasks[0]}/>
            <Task {...props.tasks[1]}/>
            <Task {...props.tasks[2]}/>
        </ul>
        <Buttons />
    </>

}