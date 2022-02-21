import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';
import s from "./CheckBox.module.css"


type DefaultCheckBoxAttributesProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type CheckBoxProps = DefaultCheckBoxAttributesProps & {
    spanClassName?: string
    onChangeChecked?: (checked: boolean) => void
}

export const CheckBox: React.FC<CheckBoxProps> = (
    {spanClassName, className, onChangeChecked, onChange,
         type, children, ...restProps}) => {
    const finalSpanClass = `${spanClassName ? spanClassName: ''} ${s.initialSpanClass}`
    const finalCheckBoxClass = `${className ? className: ''} ${s.initialCheckBoxClass}`
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event)
        onChangeChecked && onChangeChecked(event.currentTarget.checked)
    }


    return (
        <>
            <label>
                <input type="checkbox" onChange={onChangeHandler} className={finalCheckBoxClass} {...restProps} />
                {children && <span className={finalSpanClass}>{children}</span>}
            </label>
        </>
    );
};

