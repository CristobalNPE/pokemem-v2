import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import type { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { getPokemons } from "~/api/getPokemons";
import { bad, good } from "~/assets/sounds";
import PokemonCard from "~/components/PokemonCard";
import Topbar from "~/components/TopBar";
import Popover from "~/components/ui/Popover";
import { gameSettings } from "~/cookies.server";
import { getRandomLostSentence, shuffleArray } from "~/lib/utils";

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
  const goodAudio = new Audio(good);
  const badAudio = new Audio(bad);

  const gameData = useLoaderData<typeof loader>();
  const [score, setScore] = useState(0); //put score here from loader when is sent.

  //When cards in array are all marked set to hidden? idk

  //Have something like an array that holds all the gameData.pokemons 's id's, show just the correct amount
  // according to the difficulty. When clicked, 'mark it or delete it from the array'. When all from array are marked
  // we need to fetch again. There comes the difficulty.

  /*
  You finished this deck!
  Play another deck to increase 
  
  */

  const [clickedPokemonIds, setClickedPokemonIds] = useState<number[]>([]);
  const [currentTurnCards, setCurrentTurnCards] = useState<Pokemon[]>();
  const [showCards, setShowCards] = useState(true);
  const [lostTo, setLostTo] = useState<Pokemon>();
  const [lostGame, setLostGame] = useState(false);

  const storePokemonId = (pokemonId: number) => {
    //if ID already in array, endGame(). in endGame() we check if high score and show a modal with button to return or start again?
    if (clickedPokemonIds.includes(pokemonId)) {
      setLostTo(gameData.pokemons.find((p) => p.id === pokemonId));
      endGame();
      return;
    }
    setClickedPokemonIds((prev) => [...prev, pokemonId]);
    setScore((prev) => prev + 1);
    goodAudio.play();
  };

  //when clikedpokemonIds.length === gamedata.cardsPerDeck =>>> fetch more
  //for now just display a win modal, with score. If continue, refresh page but somehow pass the current score to keep building on top of it.
  //if user decides not to continue, go to main page
  //don't forget to check if high score before leaving the game, so user can put its name, and we send it with score and array of clicked ids to a  score table?

  const endGame = () => {
    setLostGame(true);
    badAudio.play();

  };

  useEffect(() => {
    function serveCards() {
      const cards = shuffleArray(gameData.pokemons).slice(
        0,
        gameData.cardsPerTurn
      );
      setCurrentTurnCards(cards);
    }
    setShowCards(false);
    serveCards();
    setTimeout(() => {
      setShowCards(true);
    }, 1000);
  }, [clickedPokemonIds, gameData.cardsPerTurn, gameData.pokemons]);

  return (
    <main className="min-h-[100dvh] flex flex-col">
      <Popover showPopover={lostGame}>
        <h1 className="text-3xl font-bold">You lost!</h1>
        <p className="text-lg italic font-thin">{getRandomLostSentence()}</p>
        <div className="flex justify-around  w-full py-8">
          <div className="flex flex-col  items-center gap-5">
            <h2 className="text-xl font-bold ">Score</h2>
            <span className="text-cyan-900 font-bold text-6xl tracking-tighter">
              {score}
            </span>
          </div>
          {lostTo ? (
            <div className="flex flex-col items-center justify-around">
              <h2 className="text-xl font-bold text-center">
                Defeated by <br />
              </h2>
              <img
                src={
                  lostTo.sprites.front_default
                    ? lostTo.sprites.front_default
                    : ""
                }
                alt={`Sprite of ${lostTo.name}`}
              />
              <span className="capitalize font-bold text-cyan-900">
                {lostTo.name}
              </span>
            </div>
          ) : null}
        </div>

        <NavLink
          className="inline-flex bg-gradient-to-r from-green-700 to-green-800 hover:bg-gradient-to-br hover:brightness-110 transition-all py-3 px-6 rounded-lg"
          to="/"
        >
          Go back and try again!
        </NavLink>
      </Popover>

      <Topbar score={score} difficulty={gameData.difficulty} />

      <div
        className={`${
          !showCards && "hidden  "
        }  flex flex-wrap gap-10 justify-center items-center grow py-2 overflow-hidden`}
      >
        {currentTurnCards?.map((pokemon) => {
          const pokemonSprite =
            pokemon.sprites.other?.["official-artwork"].front_default ||
            "No Sprite";
          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemonSprite}
              storePokemonId={storePokemonId}
            />
          );
        })}
      </div>
    </main>
  );
}

/*
cuando clickea PLAY:
we set difficulty in a cookie?


read that cookie in loader?

use it to fetch the right number of cards?



--------------------------
High score send the following object:
- player name
- player score
- array of ids of pokemon clicked
------------------

*/
