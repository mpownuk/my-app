import React from "react";

export function NavSelector({onClick, value}) {
    return (
        <p onClick={onClick}>
            {value}
        </p>
    )
}