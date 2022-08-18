import React, {useState} from "react";
import {ClickableThing} from "../ClickableThing/ClickableThing";


export function NavItem({value:initialValue}){
    const [value,setValue] = useState(initialValue);

    const handleClick = ()=>{
        setValue(value===initialValue?'changed':initialValue)
    }

    return (
        <ClickableThing
            onClick={handleClick}
            value={value}
        />
    )
}