import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from "./Button.module.css"

type DefaultButtonAttributesProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonProps = DefaultButtonAttributesProps & {
    error?: string
}

export const Button:React.FC<ButtonProps> = ({className, error, ...restProps}) => {
    const finalButtonClass = `${error ? s.error : ''} ${className ? className : ''} ${s.initialButtonClass}`
    return (
        <>
            <button className={finalButtonClass} {...restProps}/>
        </>
    );
};

