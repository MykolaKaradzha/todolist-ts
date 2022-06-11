import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {AddCircle} from "@mui/icons-material";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItem: React.FC<PropsType> = React.memo(({callBack}) => {
    console.log('AddItem called')
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

        error && setError('')

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
            <AddCircle sx={{ color: deepPurple[500] }}/>
        </IconButton>
    </>
});