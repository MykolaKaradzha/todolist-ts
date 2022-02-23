import React from "react";
import {filterType} from "../../../../App";
import {Button} from "../../../UniversalComponents/Button/Button";
import s from "./Buttons.module.css"

type PropsType = {
    todolistID: string
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType
}


export const Buttons: React.FC<PropsType> = ({filter, changeFilter, todolistID}) => {
    const allButtonClass = filter === "all" ? s.activeFilter : ""
    const activeButtonClass = filter === "active" ? s.activeFilter : ""
    const completedButtonClass = filter === "completed" ? s.activeFilter : ""
    const onClickFilterButtonHandler = (filter:filterType, todolistID: string) => () => changeFilter(filter, todolistID)
    return <div>
        <Button onClick={onClickFilterButtonHandler("all", todolistID)} className={allButtonClass}>All</Button>
        <Button onClick={onClickFilterButtonHandler("active", todolistID)} className={activeButtonClass}>Active</Button>
        <Button onClick={onClickFilterButtonHandler("completed", todolistID)} className={completedButtonClass}>Completed</Button>
    </div>
}