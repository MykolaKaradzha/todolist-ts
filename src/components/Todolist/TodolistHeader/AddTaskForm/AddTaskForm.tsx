import React, {ChangeEvent, useState} from "react";
import {Input} from "../../../UniversalComponents/Input/Input";
import {Buttons} from "../../TasksList/Buttons/Buttons";
import {Button} from "../../../UniversalComponents/Button/Button";

type PropsType = {
    addTask: (newTitle: string) => void
}

export const AddTaskForm: React.FC<PropsType> = ({addTask}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')


    const onClickButtonHandler = () => {
        if (title.trim()) {
            addTask(title)
            setTitle('')
            setError('')
        } else {
            setError('Insert title, bro!')
        }

    }
    const onKeyPressHandler = () => {
        onClickButtonHandler()
    }


    return <div>
        <Input value={title} onChangeText={setTitle} onEnterPress={onKeyPressHandler} error={error} placeholder={'enter your task here'}/>
        <Button  error={error} onClick={onClickButtonHandler}>+</Button>
    </div>
}