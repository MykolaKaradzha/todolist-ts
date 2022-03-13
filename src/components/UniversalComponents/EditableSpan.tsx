import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    oldTitle: string;
    callBack: (editedTitle: string) => void
}

export const EditableSpan:React.FC<PropsType> = ({oldTitle, callBack}) => {
    const [edited, setEdited] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(oldTitle)

    const onDoubleClickHandler = () => {
        setEdited(true)
    }
    const onBlurHandler = () => {
        callBack(title)
        setEdited(false)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
            edited ? <TextField value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
                : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
};

