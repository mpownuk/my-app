import React, { useEffect, useState } from "react";
import { Navigation } from "./Components/Navigation/Navigation";
import { PokeDex } from "./Components/PokeDex/PokeDex";
import { BattleGround } from "./Components/BattleGround/BattleGround";
import { Stats } from "./Components/Stats/Stats";

import "./styles/App.scss";

export function App() {
  const appComponentsNames = ["PokeDex", "BattleGround", "Stats"];

  const [pokemonData, setPokemonData] = useState(null);
  const [displayIem, setDisplayItem] = useState(["block", "none", "none"]);
  const [battlePoke, setBattlePoke] = useState(
    localStorage.getItem("chosenPokemon")
  );

  const displayHandler = (displayValues) => {
    setDisplayItem(displayValues);
  };

  const setMyPokemon = () => {
    setBattlePoke(localStorage.getItem("chosenPokemon"));
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) => res.json())
      .then((data) => setPokemonData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("app init");

  return (
    <div className="app">
      <Navigation
        onClick={displayHandler}
        setPoke={setMyPokemon}
        value={appComponentsNames}
      />
      <PokeDex style={{ display: displayIem[0] }} pokemonData={pokemonData} />
      <BattleGround
        style={{ display: displayIem[1] }}
        battlePoke={battlePoke}
      />
      <Stats style={{ display: displayIem[2] }} />
    </div>
  );
}
