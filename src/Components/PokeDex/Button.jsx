import "./Button.scss";

export const Button = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      {props.value}
    </button>
  );
};
