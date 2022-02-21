import {Task} from "./Task/Task";
import React from "react";

import {Buttons} from "./Buttons/Buttons";
import {taskType} from "../../../App";

type propsTypes = {
    tasks: Array<taskType>

}

export const TasksList = (props: propsTypes) => {
    const taskElements = props.tasks.map(task => <Task {...task}/>)
    return <>
        <ul>
            {taskElements}
        </ul>
        <Buttons/>
    </>

}