import {AddItem} from "../components/UniversalComponents/AddItem";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'AddItem Component',
    component: AddItem,
}
const callback = action('Button \'add\' was pressed inside the form')
export const AddItemBaseExample = (props: any) => (
    <AddItem callBack={callback}/>
)