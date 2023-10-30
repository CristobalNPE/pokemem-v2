import { PokemonClient } from "pokenode-ts";
import { createNumberArray, getRandomValuesFromArray } from "~/lib/utils";

const api = new PokemonClient();

export const getPokemons = async (numberOfPokemons: number) => {
  let [numArray, remaining] = getRandomValuesFromArray(
    numberOfPokemons,
    createNumberArray(1017)
  );

  const pokemonPromises = numArray.map(async (num) => {
    const pokemonData = await api.getPokemonById(num);
    return pokemonData;
  });
  const pokemonListData = await Promise.all(pokemonPromises);

  return { pokemonListData, remaining };
};
