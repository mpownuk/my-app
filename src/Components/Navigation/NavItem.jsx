import { NavSelector } from "./NavSelector"

export function NavItem({onClick, value}) {

    return (
        <NavSelector 
            onClick={onClick}
            value={value}
        />
    )
}