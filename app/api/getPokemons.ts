import { PokemonClient } from "pokenode-ts";
import { createNumberArray, getRandomValuesFromArray } from "~/lib/utils";

const api = new PokemonClient();

export const getPokemons = async (
  numberOfPokemons: number,
  remainingIds: number[]
) => {
  let numArray,
    remaining = [];

  //We get our pokemons from an array representing the ids of all the pokemons in the database on first load.
  if (remainingIds.length === 0) {
    [numArray, remaining] = getRandomValuesFromArray(
      numberOfPokemons, //6
      createNumberArray(1017)
    );
  }
  //From there, we use only the array with the remaining Ids to avoid duplicates.
  else {
    [numArray, remaining] = getRandomValuesFromArray(
      numberOfPokemons,
      remainingIds
    );
  }

  const pokemonPromises = numArray.map(async (num) => {
    const pokemonData = await api.getPokemonById(num);
    return pokemonData;
  });
  const pokemonListData = await Promise.all(pokemonPromises);

  return { pokemonListData, remaining };
};
