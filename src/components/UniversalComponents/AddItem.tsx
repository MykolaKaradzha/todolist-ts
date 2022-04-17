import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Icon, IconButton, TextField} from "@mui/material";
import {deepPurple, purple} from "@mui/material/colors";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItem: React.FC<PropsType> = ({callBack}) => {
    const [newTitle, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')


    const onClickButtonHandler = () => {
        if (newTitle.trim()) {
            callBack(newTitle.trim())
            setTitle('')
        } else {
            setError('Enter newTitle!')
        }

    }
    const onFocusHandler = () => {
        setError('')
    }
    const onChangeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnterPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && onClickButtonHandler()
    }


    return <>
        <TextField variant= {'outlined'} value={newTitle} onChange={onChangeTextHandler}
                   onFocus={onFocusHandler} onKeyPress={onEnterPressHandler}
                   label="Title"
                   helperText={error}
                   error={!!error}
                   size='small'
        />
        <IconButton onClick={onClickButtonHandler}>
            <Icon sx={{ color: deepPurple[500] }}>add_circle</Icon>
        </IconButton>
    </>
}