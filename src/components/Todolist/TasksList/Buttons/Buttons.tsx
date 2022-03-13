import React from "react";
import {filterType} from "../../../../App";

import s from "./Buttons.module.css"
import { MyButton } from "../../../UniversalComponents/Button/myButton";
import { Button } from "@mui/material";

type PropsType = {
    todolistID: string
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType
}


export const Buttons: React.FC<PropsType> = ({filter, changeFilter, todolistID}) => {
    // const allButtonClass = filter === "all" ? s.activeFilter : ""
    // const activeButtonClass = filter === "active" ? s.activeFilter : ""
    // const completedButtonClass = filter === "completed" ? s.activeFilter : ""
    const allButtonVariant = filter === "all" ? 'contained' : 'outlined'
    const activeButtonVariant = filter === "active" ? 'contained' : 'outlined'
    const completedButtonVariant = filter === "completed" ? 'contained' : 'outlined'

    const onClickFilterButtonHandler = (filter:filterType, todolistID: string) => () => changeFilter(filter, todolistID)

    return <div>
        <Button onClick={onClickFilterButtonHandler("all", todolistID)} variant={allButtonVariant}>All</Button>
        <Button  onClick={onClickFilterButtonHandler("active", todolistID)} variant={activeButtonVariant}>Active</Button>
        <Button  onClick={onClickFilterButtonHandler("completed", todolistID)} variant={completedButtonVariant}>Completed</Button>
    </div>
}