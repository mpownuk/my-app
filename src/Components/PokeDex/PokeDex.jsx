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

  const handleChoosePokemon = (data) => {
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
        handleChoosePokemon(data);
        console.log(randomPokemon);
      });
  };

  const handlePokeApi = () => {
    const pokemon =
      `https://pokeapi.co/api/v2/pokemon/${inputValue}`.toLowerCase();
    fetch(pokemon)
      .then((res) => {
        if (!res.ok) {
          setChosenPokemon((prev) => ({
            name: "There is not such Pokemon!",
            image: "",
          }));
        }
        return res.json();
      })
      .then((data) => {
        console.log("every time???");
        setCurrentPokemon((prev) => pokeList.length);
        setAllowAddToPokelist((prev) => true);
        handleChoosePokemon(data);
      })
      .catch(
        setChosenPokemon((prev) => ({
          name: "working...",
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

  //autocomplete elem does not have value attribute. why?
  const handleChange = (e) => {
    setInputValue((prev) => e.target.value);
  };

  const autocompleteInputValue = (value) => {
    setInputValue((prev) => value);
  };

  console.log("input value from pokedex: ", inputValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePokeApi();
  };

  const handleChoosePokemonToBattle = () => {
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
  };

  return (
    <div style={style}>
      <div className="PokeDex">
        <SearchForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          pokemonData={pokemonData}
          inputValue={inputValue}
          autocompleteInputValue={autocompleteInputValue}
        />
        <div>
          <PokeTemplate
            name={chosenPokemon.name.toLocaleUpperCase()}
            image={chosenPokemon.image}
            handleClick={handleChoosePokemonToBattle}
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
