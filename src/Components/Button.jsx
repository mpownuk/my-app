import "../styles/Button.scss";

export const Button = (props) => {
  return (
    <button
      style={props.style}
      className={props.className}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      {props.value}
    </button>
  );
};
