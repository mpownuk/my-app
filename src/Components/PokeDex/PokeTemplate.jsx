import "./PokeTemplate.scss";

export const PokeTemplate = ({ name, image, className, onClick }) => {
  return (
    <div className="poke--template">
      <h1>{name}</h1>
      <div className="poke--template--wrapper">
        <div className="poke--template--wrapper__inside">
          <img onClick={onClick} src={image} alt=" "></img>
        </div>
      </div>
    </div>
  );
};
