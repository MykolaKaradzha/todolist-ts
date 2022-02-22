import React from "react";
import {filterType} from "../../../../App";
import {Button} from "../../../UniversalComponents/Button/Button";
import s from "./Buttons.module.css"

type PropsType = {
    setFilter: (filter:filterType) => void
    filter: filterType
}


export const Buttons: React.FC<PropsType> = ({filter, setFilter}) => {
    const allButtonClass = filter === "all" ? s.activeFilter : ""
    const activeButtonClass = filter === "active" ? s.activeFilter : ""
    const completedButtonClass = filter === "completed" ? s.activeFilter : ""
    const onClickFilterButtonHandler = (filter:filterType) => () => setFilter(filter)
    return <div>
        <Button onClick={onClickFilterButtonHandler("all")} className={allButtonClass}>All</Button>
        <Button onClick={onClickFilterButtonHandler("active")} className={activeButtonClass}>Active</Button>
        <Button onClick={onClickFilterButtonHandler("completed")} className={completedButtonClass}>Completed</Button>
    </div>
}