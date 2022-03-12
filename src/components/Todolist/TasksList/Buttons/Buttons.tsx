import React from "react";
import {filterType} from "../../../../App";

import s from "./Buttons.module.css"
import { MyButton } from "../../../UniversalComponents/Button/myButton";

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
        <MyButton onClick={onClickFilterButtonHandler("all", todolistID)} className={allButtonClass}>All</MyButton>
        <MyButton onClick={onClickFilterButtonHandler("active", todolistID)} className={activeButtonClass}>Active</MyButton>
        <MyButton onClick={onClickFilterButtonHandler("completed", todolistID)} className={completedButtonClass}>Completed</MyButton>
    </div>
}