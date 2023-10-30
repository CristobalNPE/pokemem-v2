import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import type { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { getPokemons } from "~/api/getPokemons";
import PokemonCard from "~/components/PokemonCard";
import Topbar from "~/components/TopBar";
import Popover from "~/components/ui/Popover";
import { gameSettings } from "~/cookies.server";
import { useAudioSetup } from "~/hooks/audio";
import { getRandomLostSentence, shuffleArray } from "~/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};

  if (!cookie.hasOwnProperty("difficulty")) {
    return redirect("/");
  }
  let remaining: number[] = [];

  const { pokemonListData, remaining: updatedRemaining } = await getPokemons(
    Number(cookie.cardsPerDeck),
    remaining
  );

  remaining = updatedRemaining;

  return json({
    score: cookie.score || 0,
    difficulty: cookie.difficulty,
    cardsPerDeck: cookie.cardsPerDeck,
    cardsPerTurn: cookie.cardsPerTurn,
    pokemons: pokemonListData, //defer this and put a loading that says something like : Shuffling your deck!
  });
}

export default function Game() {
  const { goodAudio, badAudio, congratsAudio } = useAudioSetup();

  const gameData = useLoaderData<typeof loader>();
  const [score, setScore] = useState<number>(gameData.score);

  const [clickedPokemonIds, setClickedPokemonIds] = useState<number[]>([]);
  const [currentTurnCards, setCurrentTurnCards] = useState<Pokemon[]>();
  const [showCards, setShowCards] = useState(true);
  const [lostTo, setLostTo] = useState<Pokemon>();
  const [lostGame, setLostGame] = useState(false);
  const [wonGame, setWonGame] = useState(false);

  const storePokemonId = (pokemonId: number) => {
    if (clickedPokemonIds.includes(pokemonId)) {
      setLostTo(gameData.pokemons.find((p) => p.id === pokemonId));
      endGame();
      return;
    }
    setClickedPokemonIds((prev) => [...prev, pokemonId]);
    setScore((prev) => prev + 1);

    if (clickedPokemonIds.length === gameData.cardsPerDeck) {
      finishGame();
      return;
    }
    goodAudio?.play();
  };

  const endGame = () => {
    setLostGame(true);
    badAudio?.play();
  };

  const finishGame = () => {
    setWonGame(true);
    congratsAudio?.play();
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

      <Popover showPopover={wonGame}>
        <h1 className="text-3xl font-bold">You Won, congrats!</h1>
        <p className="text-lg font-thin">
          You can play another shuffled deck to increase your score further
        </p>
        <div className="flex justify-around  w-full py-8">
          <div className="flex flex-col  items-center gap-5">
            <h2 className="text-xl font-bold ">Score</h2>
            <span className="text-cyan-900 font-bold text-6xl tracking-tighter">
              {score}
            </span>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <NavLink
            className="inline-flex ring-2 hover:ring-1 ring-green-800 hover:brightness-110 hover:bg-green-800 transition-all py-3 px-6 rounded-lg"
            to="/"
          >
            Go home
          </NavLink>
          <Form id="scoreForm" method="post">
            <input type="text" name="score" value={score} hidden />
          </Form>
          <button
            onClick={() => setWonGame(false)}
            type="submit"
            form="scoreForm"
            className="inline-flex bg-gradient-to-r from-green-700 to-green-800 hover:bg-gradient-to-br hover:brightness-110 transition-all py-3 px-6 rounded-lg"
          >
            Keep Going!
          </button>
        </div>
      </Popover>

      <Topbar score={score} difficulty={gameData.difficulty} />
      <button
        className="bg-red-800 text-white p-2"
        onClick={() => finishGame()}
      >
        test win
      </button>
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

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gameSettings.parse(cookieHeader)) || {};
  const data = await request.formData();

  cookie.score = data.get("score");

  return redirect(".", {
    headers: {
      "Set-Cookie": await gameSettings.serialize(cookie),
    },
  });
}
