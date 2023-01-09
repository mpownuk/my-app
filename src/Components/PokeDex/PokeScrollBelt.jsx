import React, { useRef, useState } from "react";
import "../../styles/PokeDex/PokeScrollBelt.scss";

export const PokeScrollBelt = ({ pokeList, handleClick }) => {
  const [mouseEntry, setMouseEntry] = useState(0);
  const [mouseIsDown, setMouseIsDown] = useState(false);

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
      console.log("move: ", event.clientX);
    }
  };

  const touchDownHandler = (event) => {
    setMouseIsDown((prev) => true);
    setMouseEntry(
      (prev) => event.changedTouches[0].clientX + movableEl.current.scrollLeft
    );
  };

  const contMoveOnTouch = (event) => {
    let offset = mouseEntry;
    movableEl.current.scrollLeft = offset - event.changedTouches[0].clientX;
  };

  return (
    <div className="poke--scrollbelt">
      <div
        className="poke--scrollbelt__elements"
        ref={movableEl}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseMove={contMove}
        onTouchStart={touchDownHandler}
        onTouchEnd={mouseUpHandler}
        onTouchMove={contMoveOnTouch}
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
    </div>
  );
};
