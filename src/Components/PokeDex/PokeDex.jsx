import { useState, useEffect } from "react";
import { PokeInput } from "./Input";
import { PokeSubmit } from "./Submit";
import { PokeTemplate } from "./PokeTemplate";
import { PokeScrollBelt } from "./PokeScrollBelt";
import { Button } from "react-bootstrap";
import { Anim } from "./Anim";

import "./PokeDex.scss";

export function PokeDex({ style }) {
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState("pikachu");
  const [pokeName, setPokeName] = useState("pikachu");
  const [pokeImage, setPokeImage] = useState("");
  const [pokePictures, setPokePictures] = useState([]);
  const [pokeList, setPokeList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(0);
  const [flag, setFlag] = useState(true);
  const [playAnim, setPlayAnim] = useState(false);

  const getRandomPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) => res.json())
      .then((data) => {
        let pokeCount = data.count;
        let randomNumber = Math.ceil(Math.random() * pokeCount);
        let randomPokeUrl = data.results[randomNumber].url;
        fetch(randomPokeUrl)
          .then((randomRes) => randomRes.json())
          .then((data) => {
            handlePokeData(data);
            setFlag(true);

            console.log(
              "input ",
              input,
              "submit ",
              submit,
              "pokename ",
              pokeName
            );
          });
      });
  };

  const handlePokeData = (data) => {
    let name = data.species.name.toUpperCase();
    let image = data.sprites.other["official-artwork"].front_default;
    let listOfPokes = pokeList.slice();
    let picsOfPokes = pokePictures.slice();
    if (flag) {
      listOfPokes.push(data.species.name);
      picsOfPokes.push(image);
      setPokePictures(picsOfPokes);
      setCurrentPokemon(listOfPokes.length);
    }
    setPokeName(name);
    setPokeImage(image);
    setPokeList(listOfPokes);
    setFlag(true);
  };

  const handlePokeApi = () => {
    if (!submit) return;
    let pokemon = `https://pokeapi.co/api/v2/pokemon/${submit}`.toLowerCase();
    fetch(pokemon)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setPokeName("There is no such Pokemon!");
          return;
        }
      })
      .then((data) => {
        console.log(data);
        handlePokeData(data);
      });
  };

  const displayPokeFromContainer = (arg, index) => {
    setSubmit(arg);
    setCurrentPokemon(index + 1);
    setFlag(false);
    console.log(arg);
  };

  const showPreviousPokemon = () => {
    if (currentPokemon <= 1) {
      return;
    } else {
      setCurrentPokemon(currentPokemon - 1);
      setSubmit(pokeList[currentPokemon - 2]);
      setFlag(false);
    }
  };

  const showNextPokemon = () => {
    if (currentPokemon >= pokeList.length) {
      return;
    } else {
      setCurrentPokemon(currentPokemon + 1);
      setSubmit(pokeList[currentPokemon]);
      setFlag(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(input);
    setFlag(true);
  };

  // eslint-disable-next-line
  useEffect(handlePokeApi, [submit]);

  // useEffect(()=>{console.log(pokeList.length, currentPokemon, pokeList, submit, pokeImage)})

  const choosePokemonToBattle = () => {
    localStorage.setItem("chosenPokemon", pokeName);
    const handleAnim = () => {
      setPlayAnim((prevA) => true);
      setTimeout(() => {
        setPlayAnim((prevA) => false);
      }, 2000);
    };
    handleAnim();
  };

  return (
    <div style={style}>
      <div className="PokeDex">
        {playAnim && <Anim />}
        <form onSubmit={handleSubmit}>
          <PokeInput onChange={handleChange} />
          <PokeSubmit input={input} />
        </form>
        <div className="flexBox flexColumn">
          <PokeTemplate
            onClick={choosePokemonToBattle}
            name={pokeName}
            image={pokeImage}
          />
          <Button onClick={getRandomPokemon}>..or catch random one!</Button>
        </div>
        <div>
          <Button onClick={showPreviousPokemon} value={"previous"} />
          <Button onClick={showNextPokemon} value={"Next"} />
        </div>
        <PokeScrollBelt
          pokeList={pokeList}
          pictures={pokePictures}
          func={displayPokeFromContainer}
        />
      </div>
    </div>
  );
}
