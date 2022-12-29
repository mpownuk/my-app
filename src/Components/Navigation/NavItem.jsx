import "./Navitem.scss";

export function NavItem({ onClick, value }) {
  return <p onClick={onClick}>{value}</p>;
}
