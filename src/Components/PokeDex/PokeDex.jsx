import { useState, useEffect } from "react";
import { PokeTemplate } from "./PokeTemplate";
import { PokeScrollBelt } from "./PokeScrollBelt";
import { Button } from "../Button";
import { SearchForm } from "./SearchForm";

import "../../styles/PokeDex/PokeDex.scss";

export function PokeDex({ pokemonData, style }) {
  const [chosenPokemon, setChosenPokemon] = useState({
    name: "pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  });
  const [pokeList, setPokeList] = useState([chosenPokemon]);
  const [playAnim, setPlayAnim] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState(pokeList.length);
  const [allowAddToPokelist, setAllowAddToPokelist] = useState(false);

  useEffect(() => {
    if (allowAddToPokelist) {
      setPokeList((prev) => [...prev, chosenPokemon]);
      setAllowAddToPokelist((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenPokemon]);

  console.log(
    // "data: ",
    // pokemonData,
    // "pokelist: ",
    // pokeList,
    // "chosen pokemon: ",
    // chosenPokemon,
    "current pokemon: ",
    currentPokemon,
    "pokelist length: ",
    pokeList.length
  );

  const choosePokemon = (data) => {
    setChosenPokemon((prev) => ({
      name: data.species.name,
      image: data.sprites.other["official-artwork"].front_default,
    }));
  };

  const getRandomPokemon = () => {
    const randomNumber = Math.floor(Math.random() * pokemonData.count) + 1;
    const randomPokemon = pokemonData.results[randomNumber].url;
    fetch(randomPokemon)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPokemon((prev) => pokeList.length);
        setAllowAddToPokelist((prev) => true);
        choosePokemon(data);
        console.log(randomPokemon);
      });
  };

  const handlePokeApi = () => {
    const pokemon =
      `https://pokeapi.co/api/v2/pokemon/${inputValue}`.toLowerCase();
    fetch(pokemon)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentPokemon((prev) => pokeList.length);
        setAllowAddToPokelist((prev) => true);
        choosePokemon(data);
      })
      .catch(
        setChosenPokemon((prev) => ({
          name: "There is not such Pokemon!",
          image: "",
        }))
      );
  };

  const showPreviousPokemon = () => {
    if (currentPokemon <= 0) {
      return;
    } else {
      setChosenPokemon((prev) => pokeList[currentPokemon - 1]);
      setCurrentPokemon((prev) => prev - 1);
    }
  };

  const showNextPokemon = () => {
    if (currentPokemon >= pokeList.length - 1) {
      return;
    } else {
      setChosenPokemon((prev) => pokeList[currentPokemon + 1]);
      setCurrentPokemon((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePokeApi();
  };

  const choosePokemonToBattle = () => {
    localStorage.setItem("chosenPokemon", JSON.stringify(chosenPokemon));
    const handleAnim = () => {
      setPlayAnim((prevA) => true);
      setTimeout(() => {
        setPlayAnim((prevA) => false);
      }, 2000);
    };
    handleAnim();
  };

  const displayPokemonFromScrollBelt = (index) => {
    setChosenPokemon((prev) => pokeList[index]);
    setCurrentPokemon((prev) => index);

    console.log(index);
  };

  return (
    <div style={style}>
      <div className="PokeDex">
        <SearchForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          pokemonData={pokemonData}
          inputValue={inputValue}
        />
        <div>
          <PokeTemplate
            name={chosenPokemon.name}
            image={chosenPokemon.image}
            handleClick={choosePokemonToBattle}
            playAnim={playAnim}
          />
        </div>
        <div className="PokeDex--buttons--container">
          <Button
            className="PokeDex--buttons--container__random--btn"
            onClick={getRandomPokemon}
            value="..or catch random one!"
          />
          <Button value="previous" onClick={showPreviousPokemon} />
          <Button value="Next" onClick={showNextPokemon} />
        </div>
        <PokeScrollBelt
          pokeList={pokeList}
          handleClick={(index) => displayPokemonFromScrollBelt(index)}
        />
      </div>
    </div>
  );
}
