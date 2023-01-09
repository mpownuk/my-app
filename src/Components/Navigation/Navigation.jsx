import React from "react";
import { NavItem } from "../Navigation/NavItem";
import "../../styles/Navigation/Navigation.scss";

export function Navigation({ onClick, value, setPoke }) {
  return (
    <nav>
      <NavItem
        onClick={() => {
          onClick(["block", "none", "none"]);
        }}
        value={value[0]}
      />
      <NavItem
        onClick={() => {
          onClick(["none", "block", "none"]);
          setPoke();
        }}
        value={value[1]}
      />
      <NavItem
        onClick={() => {
          onClick(["none", "none", "block"]);
        }}
        value={value[2]}
      />
    </nav>
  );
}
