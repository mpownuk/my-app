import React, { useEffect, useState } from "react";
import { PokeInput } from "../Input";
import { Button } from "../Button";
import "../../styles/PokeDex/SearchForm.scss";

export const SearchForm = (props) => {
  const [datafromAPI, setDataFropmAPI] = useState("");
  const [listedPokemons, setListedPokemons] = useState(null);
  // const [autocompleteList, setAutocompleteList] = useState("")

  useEffect(() => {
    setDataFropmAPI((prev) => props.pokemonData);
  }, [props.pokemonData]);

  useEffect(() => {
    if (!datafromAPI) {
      console.log("NO DATA!");
      return;
    } else {
      setListedPokemons(
        datafromAPI.results
          .map((object) => object.name)
          .sort((a, b) => {
            const fa = a;
            const fb = b;
            return fa.localeCompare(fb);
          })
      );
    }
  }, [datafromAPI]);

  const autocompleteList = listedPokemons
    ? listedPokemons.map((listItem) => {
        return listItem.includes(props.inputValue) ? (
          <Button
            value={listItem}
            className="SearchForm--autocomplete__item"
            onClick={(e) => {
              console.log(e.target.value);
              props.handleChange(e);
            }}
          />
        ) : null;
      })
    : "no data";

  // console.log(autocompleteList);

  return (
    <div className="SearchForm">
      <form onSubmit={props.handleSubmit}>
        <PokeInput handleChange={props.handleChange} />
        <Button type="submit" value="Search!" />
      </form>
      {props.inputValue && (
        <div className="SearchForm--autocomplete">{autocompleteList}</div>
      )}
    </div>
  );
};
