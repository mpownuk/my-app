import React, { useEffect, useState } from "react";
import { PokeInput } from "../Input";
import { Button } from "../Button";
import "../../styles/PokeDex/SearchForm.scss";

export const SearchForm = (props) => {
  const [datafromAPI, setDataFropmAPI] = useState([]);
  const [listedPokemons, setListedPokemons] = useState(null);
  const [autocompleteList, setAutocompleteList] = useState([]);
  const [renderAutocompleteList, setRenderAutocompleteList] = useState(false);

  useEffect(() => {
    setDataFropmAPI((prev) => props.pokemonData);
  }, [props.pokemonData]);

  useEffect(() => {
    try {
      setListedPokemons(
        datafromAPI.results
          .map((object) => object.name)
          .sort((a, b) => {
            return a.localeCompare(b);
          })
      );
    } catch (err) {
      console.log(err);
    }
  }, [datafromAPI]);

  // const inputBlur = () => {
  //   setRenderAutocompleteList((prev) => false);
  // };

  const handleAutocomplete = () => {
    setAutocompleteList((prev) => {
      return listedPokemons.map((listItem) => {
        if (listItem.includes(props.inputValue.toLowerCase())) {
          return (
            <div
              key={listItem}
              className="SearchForm--autocomplete__item"
              onClick={(e) => {
                console.log(e.target.textContent);
                props.autocompleteInputValue(listItem);
                setRenderAutocompleteList((prev) => false);
              }}
            >
              {listItem}
            </div>
          );
        }
        return null;
      });
    });
  };

  return (
    <div className="SearchForm">
      <form onSubmit={props.handleSubmit}>
        <PokeInput
          // inputFocus={inputFocus}
          // inputBlur={inputBlur}
          setRenderAutocompleteList={setRenderAutocompleteList}
          handleChange={props.handleChange}
          handleAutocomplete={handleAutocomplete}
          disabled={listedPokemons ? false : true}
          value={props.inputValue}
        />
        <Button type="submit" value="Search!" />
      </form>
      {props.inputValue && renderAutocompleteList && (
        <div className="SearchForm--autocomplete">{autocompleteList}</div>
      )}
    </div>
  );
};
