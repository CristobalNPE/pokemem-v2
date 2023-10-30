import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPokemons } from "~/api/getPokemons";
import PokemonCard from "~/components/PokemonCard";
import { gameSettings } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};

  if (!cookie.hasOwnProperty("difficulty")) {
    return redirect("/");
  }

  const { pokemonListData, remaining } = await getPokemons(
    Number(cookie.cardsPerDeck)
  );

  return json({
    difficulty: cookie.difficulty,
    cardsPerDeck: cookie.cardsPerDeck,
    cardsPerTurn: cookie.cardsPerTurn,
    remaining: remaining,
    pokemons: pokemonListData, //defer this and put a loading that says something like : Shuffling your deck!
  });
}

export default function Game() {
  const gameData = useLoaderData<typeof loader>();
  //When cards in array are all marked set to hidden? idk

  //Have something like an array that holds all the gameData.pokemons 's id's, show just the correct amount
  // according to the difficulty. When clicked, 'mark it or delete it from the array'. When all from array are marked
  // we need to fetch again. There comes the difficulty.

  return (
    <>
      <h1 className="text-5xl font-bold">Game Page</h1>
      <h1 className="text-5xl font-bold">Difficulty: {gameData.difficulty}</h1>
      <h1 className="text-5xl font-bold">{gameData.cardsPerDeck}</h1>
      <h1 className="text-5xl font-bold">{gameData.cardsPerTurn}</h1>

      <hr />
      <div className="flex flex-wrap gap-5">
        {gameData.pokemons.map((pokemon) => {
          const pokemonSprite =
            pokemon.sprites.other?.["official-artwork"].front_default ||
            "No Sprite";
          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemonSprite}
            />
          );
        })}
      </div>
    </>
  );
}
