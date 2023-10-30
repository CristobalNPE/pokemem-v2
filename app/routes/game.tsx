import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPokemons } from "~/api/getPokemons";
import PokemonCard from "~/components/PokemonCard";
import { gameSettings } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};

  const { pokemonListData, remaining } = await getPokemons(
    Number(cookie.cardsPerDeck)
  );

  return json({
    difficulty: cookie.difficulty,
    cardsPerDeck: cookie.cardsPerDeck,
    cardsPerTurn: cookie.cardsPerTurn,
    remaining: remaining,
    pokemons: pokemonListData,
  });
}

export default function Game() {
  const gameData = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="text-5xl font-bold">Game Page</h1>
      <h1 className="text-5xl font-bold">{gameData.difficulty}</h1>
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
