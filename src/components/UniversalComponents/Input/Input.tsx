import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import s from "./Input.module.css"
import {on} from "cluster";


type DefaultInputAttributesProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputProps = DefaultInputAttributesProps & {
    error?: string
    spanClassName?: string
    onChangeText?: (newText: string) => void
    onEnterPress?: () => void
}


export const Input: React.FC<InputProps> = (
    {error, className,
        spanClassName, type, onChange, onChangeText,
        onKeyPress, onEnterPress, ...restProps}) => {

    const finalInputClass = `${error ? s.error: ''} ${className ? className: ''} ${s.initialInputClass}`

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event)
        onChangeText && onChangeText(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(event)
        onEnterPress && event.key === "Enter" && onEnterPress()
    }
    return (
        <>
            <input type="text"
                   onChange={onChangeHandler}
                   className={finalInputClass}
                   onKeyPress={onKeyPressHandler}
                   {...restProps}/>
            {error && <span className={s.errorText}>{error}</span>}
        </>
    );
};

