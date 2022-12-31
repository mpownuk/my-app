import React, { useState } from "react";
import "./PokeTemplate.scss";
import { Anim } from "./Anim";

export const PokeTemplate = ({ name, image, className, onClick, playAnim }) => {
  const [isBig, setIsBig] = useState(false);

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
        className={`poke--template--wrapper ${
          playAnim && "poke--template--wrapper__active"
        }`}
      >
        {/* {playAnim && <Anim />} */}

        <div
          className={`poke--template--wrapper__inside ${
            playAnim ? "poke--template--wrapper__inside__active " : ""
          }`}
        >
          <img
            className={`
            ${playAnim ? "img--anim" : ""}
            ${playAnim || isBig ? "img--big__active" : ""}
             `}
            src={image}
            alt=" "
          ></img>
        </div>
      </div>
    </div>
  );
};
