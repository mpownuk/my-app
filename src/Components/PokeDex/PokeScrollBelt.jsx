import React, { useRef, useState } from "react";
import ReactTouchEvents from "react-touch-events";
import "../../styles/PokeDex/PokeScrollBelt.scss";

import { Button } from "../Button";

export const PokeScrollBelt = ({ pokeList, handleClick }) => {
  const [mouseEntry, setMouseEntry] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [buttonValue, setButtonValue] = useState("nothing happend jet");

  const movableEl = useRef(null);

  // const moveBar = (item, distance, step) => {
  //   let breakPoint = 0;
  //   const movement = setInterval(() => {
  //     item.scrollLeft += step;
  //     breakPoint += Math.abs(step);
  //     if (breakPoint >= distance) {
  //       clearInterval(movement);
  //     }
  //   }, 5);
  // };

  const mouseDownHandler = (event) => {
    setMouseIsDown((prev) => true);
    setMouseEntry((prev) => event.clientX + movableEl.current.scrollLeft);
  };

  const mouseUpHandler = () => {
    setMouseIsDown((prev) => false);
  };

  const contMove = (event) => {
    if (mouseIsDown) {
      let offset = mouseEntry;
      movableEl.current.scrollLeft = offset - event.clientX;
      console.log(event.clientX, mouseEntry);
    }
  };

  const handleTap = () => {
    setButtonValue((prev) => "you have taped me");
  };

  const handleSwipe = (direction) => {
    switch (direction) {
      case "top":
      case "bottom":
      case "left":
      case "right":
        setButtonValue((prev) => `you swiped ${direction}`);
        break;
      default:
        setButtonValue((prev) => "NULL");
    }
  };

  return (
    <div className="poke--scrollbelt">
      {/* <Button
        className="hidden--button"
        value={"<"}
        onClick={() => {
          moveBar(movableEl.current, 250, -10);
        }}
      /> */}
      <ReactTouchEvents onTap={handleTap} onSwipe={handleSwipe}>
        <button
          style={{ padding: "3rem" }}
        >{`react touch events test: ${buttonValue}`}</button>
      </ReactTouchEvents>

      <Button
        style={{ padding: "3rem" }}
        onTap={handleTap}
        onSwipe={handleSwipe}
        value={`custom button test: ${buttonValue}`}
      ></Button>
      <div
        className="poke--scrollbelt__elements"
        ref={movableEl}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={contMove}
        // onTouchStart={() => console.log("touch started")}
        // onTouchEnd={() => console.log("touch ended")}
        // onTouchMove={() => console.log("touch is running")}
      >
        {pokeList.map((poke, idx) => {
          return (
            <div className="poke--scrollbelt__item" key={poke.name}>
              <img
                className="poke--scrollbelt__icon"
                src={`${poke.image}`}
                alt=" "
              ></img>
              <p>Select:</p>
              <button onClick={() => handleClick(idx)}>
                {poke.name.toUpperCase()}
              </button>
            </div>
          );
        })}
      </div>
      {/* <Button
        className="hidden--button"
        value={">"}
        onClick={() => moveBar(movableEl.current, 250, 10)}
      /> */}
    </div>
  );
};
