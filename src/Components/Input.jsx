import React from "react";

export const PokeInput = (props) => {
  const inputFocus = () => {
    props.handleAutocomplete();
    props.setRenderAutocompleteList((prev) => true);
  };
  return (
    <input
      onBlur={props.inputBlur}
      onFocus={inputFocus}
      onChange={props.handleChange}
      onKeyUp={props.handleAutocomplete}
      disabled={props.disabled}
      value={props.value}
    ></input>
  );
};
