import React from 'react'
import {NavItem} from '../Navigation/NavItem'
import "./Navigation.css";

export function Navigation() {
    const arr = ['click me', 'or me', 'or me!']
       return (
        <nav>
            <NavItem value={arr[0]} />
            <NavItem value={arr[1]} />
            <NavItem value={arr[2]} />
        </nav>
    ) 
}