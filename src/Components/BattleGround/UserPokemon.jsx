import React, { useEffect, useState } from "react";
import { PokeTemplate } from "../PokeDex/PokeTemplate";

export const UserPokemon = ({ battlePoke }) => {
  const [pokeImage, setPokeImage] = useState(null);

  useEffect(() => {
    if (!battlePoke) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${battlePoke.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        let image = data.sprites.other["official-artwork"].front_default;
        setPokeImage(image);
      });
  }, [battlePoke]);

  return (
    <div className="user--pokemon">
      <PokeTemplate name={battlePoke} image={pokeImage} />
    </div>
  );
};
