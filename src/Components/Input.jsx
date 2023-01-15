export const PokeInput = (props) => {
  return (
    <input
      onBlur={props.inputBlur}
      onFocus={props.inputFocus}
      onChange={props.handleChange}
      onKeyUp={props.handleKeyUp}
      disabled={props.disabled}
      value={props.value}
    ></input>
  );
};
