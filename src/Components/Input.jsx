export const PokeInput = (props) => {
  console.log("input value from input component: ", props.value);
  return (
    <input
      onChange={props.handleChange}
      onKeyUp={props.handleKeyUp}
      disabled={props.disabled}
      value={props.value}
    ></input>
  );
};
