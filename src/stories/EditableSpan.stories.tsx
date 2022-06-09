import {action} from "@storybook/addon-actions";
import React from "react";
import {EditableSpan} from "../components/UniversalComponents/EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}
const callback = action("Span was edited in the form")
export const EditableSpanBaseExample = (props:any) => (
    <EditableSpan oldTitle={'random stuff'} callBack={callback}/>
)
