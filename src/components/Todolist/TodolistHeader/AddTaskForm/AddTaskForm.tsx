import React, {useState} from "react";
import {Input} from "../../../UniversalComponents/Input/Input";
import {Button} from "../../../UniversalComponents/Button/Button";

type PropsType = {
    todolistID: string
    addTask: (newTitle: string, todolistID: string) => void
}

export const AddTaskForm: React.FC<PropsType> = ({addTask, todolistID}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')


    const onClickButtonHandler = () => {
        if (title.trim()) {
            addTask(title.trim(), todolistID)
            setTitle('')
        } else {
            setError('Insert title, bro!')
        }

    }
    const onFocusHandler = () => {
        setError('')
    }


    return <div>
        <Input value={title} onChangeText={setTitle}  onFocus={onFocusHandler} onEnterPress={onClickButtonHandler}
               error={error} placeholder={'enter your task here'}/>
        <Button  error={error} onClick={onClickButtonHandler}>+</Button>
    </div>
}