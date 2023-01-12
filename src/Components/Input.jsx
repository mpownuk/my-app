export const PokeInput = (props) => {
  return <input onChange={props.handleChange}>{props.inputValue}</input>;
};
