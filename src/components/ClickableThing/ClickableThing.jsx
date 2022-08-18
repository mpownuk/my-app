import React from "react";


export function ClickableThing({onClick,value}){
    return (
        <p onClick={onClick}>
            {value}
        </p>
    )
}