import React, {useCallback} from "react";
import {filterType} from "../../../../App";
import { Button } from "@mui/material";

type PropsType = {
    todolistID: string
    changeFilter: (filter:filterType, todolistID: string) => void
    filter: filterType
}


export const Buttons: React.FC<PropsType> = React.memo(({filter, changeFilter, todolistID}) => {
    // const allButtonClass = filter === "all" ? s.activeFilter : ""
    // const activeButtonClass = filter === "active" ? s.activeFilter : ""
    // const completedButtonClass = filter === "completed" ? s.activeFilter : ""
    const allButtonVariant = filter === "all" ? 'contained' : 'outlined'
    const activeButtonVariant = filter === "active" ? 'contained' : 'outlined'
    const completedButtonVariant = filter === "completed" ? 'contained' : 'outlined'

    const onClickFilterButtonHandler = useCallback((filter:filterType, todolistID: string) =>
        () => changeFilter(filter, todolistID), [changeFilter])

    return <div>
        <Button onClick={onClickFilterButtonHandler("all", todolistID)} variant={allButtonVariant}>All</Button>
        <Button  onClick={onClickFilterButtonHandler("active", todolistID)} variant={activeButtonVariant}>Active</Button>
        <Button  onClick={onClickFilterButtonHandler("completed", todolistID)} variant={completedButtonVariant}>Completed</Button>
    </div>
})