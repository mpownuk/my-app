import React from "react";
import "./PokeTemplate.scss";

export const PokeTemplate = ({ name, image, className, onClick }) => {
  const [isBig, setIsBig] = React.useState(false);

  const resizePokemon = () => {
    setIsBig((prevB) => !prevB);
  };

  return (
    <div className="poke--template">
      <h1>{name}</h1>
      <div
        onMouseEnter={resizePokemon}
        onMouseLeave={resizePokemon}
        onClick={onClick}
        className="poke--template--wrapper"
      >
        <div className="poke--template--wrapper__inside">
          <img
            className={`${isBig ? "img--big" : ""}`}
            src={image}
            alt=" "
          ></img>
        </div>
      </div>
    </div>
  );
};
