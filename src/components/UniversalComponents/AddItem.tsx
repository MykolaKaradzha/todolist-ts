import React, {useState} from "react";
import {Input} from "./Input/Input";
import {MyButton} from "./Button/myButton";

type PropsType = {
    callBack: (newTitle: string) => void
}

export const AddItem: React.FC<PropsType> = ({callBack}) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')


    const onClickButtonHandler = () => {
        if (title.trim()) {
            callBack(title.trim())
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
               error={error}/>
        <MyButton error={error} onClick={onClickButtonHandler}>+</MyButton>
    </div>
}