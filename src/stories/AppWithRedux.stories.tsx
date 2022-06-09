import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ProviderReduxStoreDecorator} from "./ProviderReduxStoreDecorator";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ProviderReduxStoreDecorator],
}
export const AppWithReduxBaseExample = (props:any) => (
        <AppWithRedux/>
)